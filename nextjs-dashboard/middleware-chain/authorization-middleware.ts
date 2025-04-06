import {AbstractMiddlewareChain} from "@/middleware-chain/abstract-middleware-chain";
import {NextMiddleware, NextRequest} from "next/server";
import {ChainHandler} from "@/middleware-chain/chain-handler";

export class AuthorizationMiddleware extends AbstractMiddlewareChain {

    protected handleRequest(data: NextRequest, next: ChainHandler["handle"]): ReturnType<NextMiddleware> {
        console.log('Authorization Middleware');

        // Perform authorization logic here

        // Call the next middleware in the chain
        return next(data);
    }
}