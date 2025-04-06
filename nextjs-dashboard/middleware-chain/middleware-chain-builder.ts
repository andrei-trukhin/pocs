import {ChainHandler} from "@/middleware-chain/chain-handler";
import {AbstractMiddlewareChain} from "@/middleware-chain/abstract-middleware-chain";

export class MiddlewareChainBuilder {

    private _firstMiddleware?: AbstractMiddlewareChain;
    private _chain?: AbstractMiddlewareChain;

    add(middleware: AbstractMiddlewareChain): this {
        // If this is the first middleware, set it as the first middleware
        if (!this._firstMiddleware) {
            this._firstMiddleware = middleware;
        }

        // If there is a chain, set the next middleware
        this._chain?.setNext(middleware);
        // Set the current middleware as the chain
        this._chain = middleware;
        return this;
    }

    build(): ChainHandler {
        if (!this._firstMiddleware) {
            throw new Error('Middleware chain is empty. Please add at least one middleware.');
        }

        return this._firstMiddleware;
    }
}