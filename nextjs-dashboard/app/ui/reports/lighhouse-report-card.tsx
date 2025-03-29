'use client';

import React, {useContext, useEffect, useState} from "react";
import {LighthouseReport} from "@/app/ui/reports/_state/state";
import {LighthouseReportReactContext} from "@/app/ui/reports/_state/context";
import {Card, CardContent, CardTitle} from "@/app/ui/reports/cards";
import {Accessibility, Gauge, Globe, Search, ShieldCheck} from "lucide-react";
import StatusCard from "@/app/ui/reports/status-card";
import Link from "next/link";

const LighthouseCard = () => {
    const context = useContext(LighthouseReportReactContext);
    const [report, setReport] = useState<LighthouseReport | null>(null);

    useEffect(() => {
        new Promise<LighthouseReport | null>(async (resolve) => {
            resolve(await context.state.getReport());
        }).then(report => {
            setReport(report);
        }).catch(error => {
            console.warn('Failed to fetch Lighthouse report:', error);
        });
    }, []);

    const reportData = [
        { key: 'performance', report: report?.performance, label: 'Performance', icon: Gauge },
        { key: 'accessibility', report: report?.accessibility, label: 'Accessibility', icon: Accessibility },
        { key: 'bestPractices', report: report?.bestPractices, label: 'Best Practices', icon: ShieldCheck },
        { key: 'seo', report: report?.seo, label: 'SEO', icon: Search },
    ];

    const scoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <Card className="w-full max-w-md rounded-2xl shadow-lg bg-white">
            <CardTitle className={"flex items-center"}>
                <Globe className="text-blue-600" />
                <span className={"p-2"}>Lighthouse Report</span>

                <div className="flex items-center ml-auto ">
                    <StatusCard status={context.state.status} />
                </div>
            </CardTitle>
            <CardContent className="p-6">
                <div className={`grid grid-cols-1 gap-4 ${context.state.status === 'loading' ? 'animate-pulse' : ''}`}>
                    {reportData.map(({key, report, label, icon: Icon}) => (
                        <div key={key}
                             className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Icon size={20} className="text-gray-500"/>
                                <span className="text-sm font-medium">{label}</span>
                            </div>
                            <span className={`text-sm font-semibold ${scoreColor(report ?? 0)}`}>
                                {report}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-right">
                {/*  Link as button to navigate to /dashboard/reports  */}
                    <Link href={"/dashboard/reports"} className={"inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"}>
                        Details
                    </Link>
                </div>
            </CardContent>

        </Card>
    );
};

export default LighthouseCard;
