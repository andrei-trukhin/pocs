import { LighthouseReport} from "@/app/ui/reports/_state/state";

const generateRandomScore = () => Math.floor(Math.random() * 100);
export const generateRandomReport = (): LighthouseReport => ({
    performance: generateRandomScore(),
    accessibility: generateRandomScore(),
    bestPractices: generateRandomScore(),
    seo: generateRandomScore(),
});


const simulateError = () => {
    if (Math.random() > 0.5) {
        console.log('[Fetch Lighthouse Report] Simulating error');
        return new Error('Failed to fetch Lighthouse report');
    }

    return null;
}


export function fetchLighthouseReport(simulatingTimeout: number): Promise<LighthouseReport> {
    return new Promise<LighthouseReport>(async (resolve, reject) => {
        console.log('[Fetch Lighthouse Report] Simulating fetch Lighthouse report...');
        await new Promise(resolve => setTimeout(resolve, simulatingTimeout));

        console.log('[Fetch Lighthouse Report] Fetching Lighthouse report...');
        const error = simulateError();
        if (error) {
            reject(error);
            return;
        }
        // Generate random report
        const mockReport = generateRandomReport();
        resolve(mockReport);
    })
}