import React from "react";

export const Card = ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`bg-white shadow-lg rounded-2xl p-4 ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`flex justify-between items-center mb-2 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => (
    <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

export const CardContent = ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`text-sm ${className}`}>{children}</div>
);