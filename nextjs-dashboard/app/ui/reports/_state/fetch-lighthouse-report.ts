import { LighthouseReport} from "@/app/ui/reports/_state/state";

const generateRandomScore = () => Math.floor(Math.random() * 100);
export const generateRandomReport = (): LighthouseReport => ({
    performance: generateRandomScore(),
    accessibility: generateRandomScore(),
    bestPractices: generateRandomScore(),
    seo: generateRandomScore(),
});

export function fetchLighthouseReport(): Promise<LighthouseReport> {
    return new Promise<LighthouseReport>(async (resolve) => {
        // Generate random report
        const mockReport = generateRandomReport();
        resolve(mockReport);
    })
}