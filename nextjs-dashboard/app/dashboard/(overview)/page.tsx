import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton} from '@/app/ui/skeletons';
import CardWrapper from "@/app/dashboard/cards";
import LighthouseCard from "@/app/ui/reports/lighhouse-report-card";
import E2ETestsCard from "@/app/ui/reports/e2e-test-card";

export default async function Page() {

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid grid-cols-2 grid-rows-5 gap-4">
                <LighthouseCard />
                <E2ETestsCard />
            </div>
        </main>
    );
}