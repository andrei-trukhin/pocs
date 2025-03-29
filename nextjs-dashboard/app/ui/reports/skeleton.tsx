import React from "react";

export const Skeleton = ({ className }: {
    className?: string;
}) => (
    <div className={`bg-gray-300 animate-pulse rounded-md animate-pulse ${className}`} />
);