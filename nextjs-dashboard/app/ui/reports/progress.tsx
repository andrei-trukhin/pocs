import React from "react";

export const Progress = ({ value, className }: {
    value: number;
    className?: string;
}) => (
    <div className={`relative w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}>
        <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${value}%` }}
        />
    </div>
);