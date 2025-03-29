import {fetchLighthouseReport} from "@/app/ui/reports/_state/fetch-lighthouse-report";

export interface LighthouseReport {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa?: number;
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



export const getStateContext = () => new StateContext();

export class StateContext {
    set state(state: LighthouseReportState) {
        console.log('[StateContext] Setting state:', state.status);
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
        console.log('[StateContext] Subscribing to state changes');
        this._stateSubject = callback;

        return () => {
            console.log('[StateContext] Unsubscribing from state changes');
            this._stateSubject = undefined; // Cleanup the subscription
        };
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

        // Simulate progress
        const simulationTimeout = 4000;
        this.simulateProgress(simulationTimeout);

        this.report = fetchLighthouseReport(simulationTimeout).then(report => {
            if (this.canceled) {
                return null;
            }
            this.context.state = new LoadedState(this.context, report);
            return report;
        }).catch(error => {
            this.canceled = true;
            context.state = new ErrorState(context);
            console.warn('Failed to fetch Lighthouse report:', error);
            return null;
        });
    }

    private simulateProgress(simulationTimeout: number) {
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

class ErrorState implements LighthouseReportState {

    get status(): Status {
        return 'error';
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