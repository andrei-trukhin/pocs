import React, {useEffect, useState} from "react";
import {Progress} from "@/app/ui/reports/progress";

export const LoadingProgress = ({ loading, progress }: {
    loading: boolean;
    progress: number;
}) => {
    return (
        <div className="w-full mb-4 h-10 flex items-center">
            {loading ? (
                <>
                    <div className="text-sm font-medium mr-2">Loading Report... {progress}%</div>
                    <Progress value={progress} className="flex-grow"/>
                </>
            ) : (
                <div className="h-full"/>
            )}
        </div>
    );
};