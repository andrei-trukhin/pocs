import {ChainHandler} from "@/middleware-chain/chain-handler";
import {NextMiddleware, NextRequest} from "next/server";

export abstract class AbstractMiddlewareChain implements ChainHandler {

    private _nextHandler?: ChainHandler;

    handle(data: NextRequest): ReturnType<NextMiddleware> {
        return this.handleRequest(data, () => {
            if (this._nextHandler) {
                return this._nextHandler.handle(data);
            }
            return undefined;
        });
    }

    setNext(handler: ChainHandler): void {
        this._nextHandler = handler;
    }

    protected abstract handleRequest(data: NextRequest, next: ChainHandler['handle']): ReturnType<NextMiddleware>;
}