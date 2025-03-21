'use client';

import { Loader, CheckCircle, XCircle, PauseCircle } from 'lucide-react';
import {Status} from "@/app/ui/reports/_state/state";
import {JSX} from "react";

const statusStyles: Record<Status, string> = {
    idle: 'text-gray-500',
    loading: 'text-blue-500 animate-spin',
    loaded: 'text-green-600',
    cancelled: 'text-red-600',
    error: 'text-red-600',
};

const statusIcons: Record<Status, JSX.Element> = {
    idle: <PauseCircle className="w-5 h-5" />,
    loading: <Loader className="w-5 h-5" />,
    loaded: <CheckCircle className="w-5 h-5" />,
    cancelled: <XCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
};

export const StatusDisplay = ({ status = 'idle' }: {
    status: Status
}) => {
    const style = statusStyles[status] || statusStyles.idle;
    const icon = statusIcons[status] || statusIcons.idle;

    return (
        <div className={`flex items-center gap-2 font-medium ${style}`}>
            {icon}
            <span className="capitalize">{status}</span>
        </div>
    );
};