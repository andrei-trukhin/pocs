import {AbstractMiddlewareChain} from "@/middleware-chain/abstract-middleware-chain";
import {NextMiddleware, NextRequest} from "next/server";
import {ChainHandler} from "@/middleware-chain/chain-handler";

export class PublicPagesFilterMiddleware extends AbstractMiddlewareChain {

    constructor(private readonly publicPages: readonly string[]) {
        super();
    }

    protected handleRequest(data: NextRequest, next: ChainHandler['handle']): ReturnType<NextMiddleware> {
        const pathname = data.nextUrl.pathname;
        console.log('Pages Filter Middleware', pathname);

        // Check if the pathname matches any of the public pages
        const isFreeAccessPage = this.publicPages.some(page => pathname.startsWith(page));
        if (isFreeAccessPage) {
            console.log('Public Pages Filter Middleware', pathname, 'is a free access page');
            // If the page is in the free access pages, allow access
            return undefined;
        }

        // Call the next middleware in the chain
        return next(data);
    }
}