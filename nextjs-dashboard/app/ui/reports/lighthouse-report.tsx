'use client';

import React, {useState, useEffect, useRef} from 'react';
import {CheckCircle, AlertTriangle, XCircle, RefreshCcw, Ban} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from "@/app/ui/reports/cards";
import {Skeleton} from "@/app/ui/reports/skeleton";
import {Progress} from "@/app/ui/reports/progress";
import {LoadingProgress} from "@/app/ui/reports/loading-progress";
import {StatusDisplay} from "@/app/ui/reports/status-display";
import {generateRandomReport, LighthouseReport, Status} from "@/app/ui/reports/_state/state";

const LighthouseDashboard = () => {
    const reportRef = useRef<LighthouseReport | null>(null);
    const [report, setReport] = useState(reportRef.current);
    const [loading, setLoading] = useState<boolean>(report === null);
    const [progress, setProgress] = useState<number>(0);
    const [status, setStatus] = useState<Status>('idle');
    const [cancelled, setCancelled] = useState<boolean>(false);

    const setReportInternal = (_report: LighthouseReport) => {
        reportRef.current = _report;
        setReport(_report);
    }

    const fetchReport = async () => {
        console.log('Fetching report...');
        setLoading(true);
        setProgress(0);
        setStatus('loading');
        try {
            const simulatingTimeout = 5000
            // Simulate progress
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (cancelled) {
                        clearInterval(interval);
                        return 0;
                    }
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 5;
                });
            }, simulatingTimeout / 15);
            // Simulating API fetch with mock data
            await new Promise(resolve => setTimeout(resolve, simulatingTimeout));
            if (cancelled) {
                clearInterval(interval);
                setStatus('cancelled');
                return;
            }

            // Set loaded report
            setReportInternal(generateRandomReport());
            setLoading(false);
            setStatus('loaded');
        } catch (error) {
            console.error('Failed to fetch Lighthouse report:', error);
            setLoading(false);
            setStatus('error');
        }
    }

    const cancelReport = () => () => {
        setCancelled(true);
        setStatus('cancelled');
    }

    useEffect(() => {
        if (report) return;
        fetchReport();
    }, [report]);

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-600';
    };

    const getScoreIcon = (score: number) => {
        if (score >= 90) return <CheckCircle className="text-green-600" />;
        if (score >= 50) return <AlertTriangle className="text-yellow-500" />;
        return <XCircle className="text-red-600" />;
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Lighthouse Report Dashboard</h2>
            <div className="flex items-center gap-2 mb-4">
                <StatusDisplay status={status}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                <button
                    onClick={fetchReport}
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    <RefreshCcw className="w-5 h-5"/> Reload Report
                </button>
                <button
                    onClick={cancelReport()}
                    disabled={!loading}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                    <Ban className="w-5 h-5"/> Cancel Report
                </button>
            </div>
            {loading && <LoadingProgress loading={loading} progress={progress}/>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                {loading && Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full"/>
                ))}

                {!loading && report && Object.entries(report).map(([key, score]) => (
                    <Card key={key} className="shadow-lg rounded-2xl p-4">
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle className="">{key.charAt(0).toUpperCase() + key.slice(1)}</CardTitle>
                            {getScoreIcon(score)}
                        </CardHeader>
                        <CardContent className="">
                            <div className="flex justify-between text-sm font-medium">
                                <span className={getScoreColor(score)}>{score}%</span>
                                <span>100%</span>
                            </div>
                            <Progress value={score} className="mt-2"/>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LighthouseDashboard;