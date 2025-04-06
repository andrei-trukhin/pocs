import {AbstractMiddlewareChain} from "@/middleware-chain/abstract-middleware-chain";
import {NextMiddleware, NextRequest, NextResponse} from "next/server";
import {ChainHandler} from "@/middleware-chain/chain-handler";

type Redirect = {
    from: string;
    to: string;
    proxy?: boolean;
}

export class RedirectsMiddleware extends AbstractMiddlewareChain {

    constructor(private readonly redirects: readonly Redirect[]) {
        super();
    }

    protected handleRequest(data: NextRequest, next: ChainHandler["handle"]): ReturnType<NextMiddleware> {
        // Perform redirects logic here
        console.log('Redirects Middleware');

        // Check if the pathname matches any of the redirects
        const pathname = data.nextUrl.pathname;
        const redirect = this.redirects.find(redirect => pathname.startsWith(redirect.from));
        if (redirect) {
            // If the page is in the redirects, perform the redirect
            const redirectUrl = new URL(redirect.to, data.url);
            return redirect.proxy ?
                NextResponse.rewrite(redirectUrl) :
                NextResponse.redirect(redirectUrl);
        }

        // Call the next middleware in the chain
        return next(data);
    }

}