'use client';

import {Card, CardContent, CardTitle} from "@/app/ui/reports/cards";
import {CircleCheck, CircleX, Globe} from "lucide-react";
import StatusCard from "@/app/ui/reports/status-card";
import Link from "next/link";

const E2ETestsCard = () => {

    const reportData = [
        { key: 'performance', report: 90, label: 'Login Test', icon: CircleCheck },
        { key: 'speed', report: 90, label: 'Signup Test', icon: CircleCheck },
        { key: 'usability', report: 20, label: 'Payment Test', icon: CircleX },
        { key: 'compatibility', report: 92, label: 'Search Test', icon: CircleCheck },
        { key: 'security', report: 25, label: 'Checkout Test', icon: CircleX },
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
                <span className={"p-2"}>E2E Tests</span>

                <div className="flex items-center ml-auto ">
                    <StatusCard status={'loaded'} />
                </div>
            </CardTitle>
            <CardContent className="p-6">
                <div className={`grid grid-cols-1 gap-4`}>
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
                    <Link href={"/dashboard/e2e-test"} className={"inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"}>
                        Details
                    </Link>
                </div>
            </CardContent>

        </Card>
    );
};

export default E2ETestsCard;
