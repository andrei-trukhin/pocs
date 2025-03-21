import LighthouseReport from "@/app/ui/reports/lighthouse-report";
import LighthouseReportState from "@/app/ui/reports/lighthouse-report-state";

export default async function Page() {
    return (
        <div className="w-full">
            <LighthouseReport />
            <LighthouseReportState />
        </div>
    );
}