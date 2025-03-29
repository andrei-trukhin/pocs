'use client';

import React from 'react';
import { Loader2, CheckCircle, PauseCircle, Hourglass } from 'lucide-react';
import {Card, CardContent} from "@/app/ui/reports/cards";
import {Status} from "@/app/ui/reports/_state/state";


type Props = {
    status: Status;
};

const StatusCard: React.FC<Props> = ({ status }) => {
    const getStatusContent = () => {
        switch (status) {
            case 'idle':
                return {
                    icon: <Hourglass className="text-gray-400" size={32} />,
                    label: 'Idle',
                    color: 'text-gray-500',
                };
            case 'loading':
                return {
                    icon:<Loader2 className="animate-spin text-blue-500" size={32} strokeWidth={2} />,
                    label: 'Loading...',
                    color: 'text-blue-600',
                };
            case 'loaded':
                return {
                    icon: <CheckCircle className="text-green-500" size={32} />,
                    label: 'Loaded',
                    color: 'text-green-600',
                };
            case 'cancelled':
                return {
                    icon: <PauseCircle className="text-red-500" size={32} />,
                    label: 'Canceled',
                    color: 'text-red-600',
                };
            default:
                return {
                    icon: null,
                    label: 'Unknown',
                    color: 'text-gray-400',
                };
        }
    };

    const { icon, label, color } = getStatusContent();

    return (
        <Card className="rounded-2xl shadow-md bg-white">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-3">{icon}</div>
                <h3 className={`text-lg font-semibold ${color}`}>{label}</h3>
            </CardContent>
        </Card>
    );
};

export default StatusCard;
