'use client';

import React, {useState, useEffect, useContext} from 'react';
import {CheckCircle, AlertTriangle, XCircle, RefreshCcw, Ban} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from "@/app/ui/reports/cards";
import {Skeleton} from "@/app/ui/reports/skeleton";
import {Progress} from "@/app/ui/reports/progress";
import {LoadingProgress} from "@/app/ui/reports/loading-progress";
import {getStateContext, LighthouseReport, LighthouseReportState} from "@/app/ui/reports/_state/state";
import {StatusDisplay} from "@/app/ui/reports/status-display";

const stateContext = getStateContext();
const reactContext = React.createContext(stateContext);

const LighthouseDashboardState = () => {
    const context = useContext(reactContext);
    // console.log('Context:', context);

    const [report, setReport] = useState<LighthouseReport | null>(null);

    const [loading, setLoading] = useState<boolean>(context.state.status === 'loading');

    const onStateChange = (state: LighthouseReportState) => {
        setLoading(context.state.status === 'loading');
        updateReports();
    }
    context.subscribeToState(onStateChange);

    const [progress, setProgress] = useState(context.progress);
    context.subscribeToProgress(setProgress);

    const updateReports = () => {
        console.log('Setting report:', context.state.status);

        if (context.state.status === 'idle') {
            context.state.loadReport();
        }

        new Promise<LighthouseReport | null>(async (resolve) => {
            resolve(context.state.getReport());
        }).then(report => {
            setReport(report);
        }).catch(error => {
            console.warn('Failed to fetch Lighthouse report:', error);
        });
    };

    useEffect(() => {
        updateReports();
    }, []);

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
            <h2 className="text-2xl font-bold mb-4">Lighthouse Report Dashboard (State Pattern)</h2>
            <div className="flex items-center gap-2 mb-4">
                <StatusDisplay status={context.state.status}/>
            </div>

            {/* Buttons grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                <button
                    onClick={() => context.state.loadReport()}
                    disabled={context.state.status === 'loading'}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    <RefreshCcw className="w-5 h-5"/> Reload Report
                </button>
                <button
                    onClick={() => context.state.cancelReport()}
                    disabled={context.state.status !== 'loading'}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                    <Ban className="w-5 h-5"/> Cancel Report
                </button>
            </div>

            <LoadingProgress loading={loading} progress={progress}/>
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

export default LighthouseDashboardState;