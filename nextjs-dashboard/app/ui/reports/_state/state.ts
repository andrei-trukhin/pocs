
export interface LighthouseReport {
    performance: number;
    accessibility: number;
    'best practices': number;
    seo: number;
}

export type Status = 'loading' | 'loaded' | 'error' | 'cancelled' | 'idle';

export interface LighthouseReportState {
    /**
     * Triggers the loading of the report.
     */
    loadReport: () => void;
    /**
     * Returns the promise of the report. If the report is not loaded, it will return null.
     * Trigger the loadReport method to initiate the loading of the report.
     */
    getReport: () => Promise<LighthouseReport | null>;
    cancelReport: () => void;
    readonly status: Status;
}

const generateRandomScore = () => Math.floor(Math.random() * 100);
export const generateRandomReport = (): LighthouseReport => ({
    performance: generateRandomScore(),
    accessibility: generateRandomScore(),
    'best practices': generateRandomScore(),
    seo: generateRandomScore(),
});

export const getStateContext = () => new StateContext();

export class StateContext {
    set state(state: LighthouseReportState) {
        this._state = state;
        this._stateSubject?.(state);
    }
    get state() {
        return this._state;
    }
    private _state: LighthouseReportState = new InitialState(this);

    get progress() {
        return this._progress;
    }
    private _progress: number = 0;

    private _stateSubject?: (state: LighthouseReportState) => void;
    private _progressSubject?: (progress: number) => void;

    subscribeToState(callback: (state: LighthouseReportState) => void) {
        this._stateSubject = callback;
    }

    subscribeToProgress(callback: (progress: number) => void) {
        this._progressSubject = callback;
    }

    notifyProgress(progress: number) {
        this._progress = progress;
        this._progressSubject?.(progress);
    }
}


class InitialState implements LighthouseReportState {

    get status(): Status {
        return 'idle';
    }

    constructor(private readonly context: StateContext) {
        this.context.notifyProgress(0);
    }

    loadReport() {
        this.context.state = new LoadingState(this.context);
    }

    async getReport(): Promise<null> {
        return null;
    }

    cancelReport() {
        // do nothing
    }
}


class LoadingState implements LighthouseReportState {
    private readonly report: Promise<LighthouseReport | null>;

    get status(): Status {
        return 'loading';
    }

    private canceled = false;

    constructor(private readonly context: StateContext) {
        this.context.notifyProgress(0);

        this.report = new Promise<LighthouseReport | null>(async (resolve) => {
            const simulationTimeout = 10000;
            // Simulate progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                if (this.canceled) {
                    clearInterval(interval);
                    // reject('Report loading canceled');
                    return null; // it's important to return null here, otherwise the context will be updated after the rejection
                }
                this.context.notifyProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, simulationTimeout / 20);

            // Simulating API fetch with mock data
            await new Promise(resolve => setTimeout(resolve, simulationTimeout));
            if (this.canceled) {
                clearInterval(interval);
                // reject('Report loading canceled');
                return null; // it's important to return null here, otherwise the context will be updated after the rejection
            }

            // Generate random report
            const mockReport = generateRandomReport();
            context.state = new LoadedState(context, mockReport);
            resolve(mockReport);

        }).catch(error => {
            context.state = new InitialState(context);
            console.warn('Failed to fetch Lighthouse report:', error);
            return null;
        });
    }

    loadReport() {
        // do nothing
    }

    async getReport(): Promise<LighthouseReport | null> {
        return this.report;
    }

    cancelReport() {
        this.canceled = true;
        this.context.state = new CancelledState(this.context);
    }
}


class LoadedState implements LighthouseReportState {

    get status(): Status {
        return 'loaded';
    }

    constructor(private readonly context: StateContext, private readonly report: LighthouseReport) {
        this.context.notifyProgress(100);
    }

    loadReport() {
        this.context.state = new LoadingState(this.context);
    }

    async getReport(): Promise<LighthouseReport> {
        return this.report;
    }

    cancelReport() {
        // do nothing
    }
}


class CancelledState implements LighthouseReportState {

    get status(): Status {
        return 'cancelled';
    }

    constructor(private readonly context: StateContext) {
        this.context.notifyProgress(0);
    }

    loadReport() {
        this.context.state = new LoadingState(this.context);
    }

    async getReport(): Promise<null> {
        return null
    }

    cancelReport() {
        // do nothing
    }
}