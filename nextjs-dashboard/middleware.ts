import { NextRequest} from "next/server";
import {MiddlewareChainBuilder} from "@/middleware-chain/middleware-chain-builder";
import {AuthenticationMiddleware} from "@/middleware-chain/authentication-middleware";
import {AuthorizationMiddleware} from "@/middleware-chain/authorization-middleware";
import {PublicPagesFilterMiddleware} from "@/middleware-chain/public-pages-filter-middleware";
import {RedirectsMiddleware} from "@/middleware-chain/redirects-middleware";

const middlewareChain = new MiddlewareChainBuilder()
    .add(new PublicPagesFilterMiddleware([
        '/login',
        //'/dashboard'
    ]))
    .add(new AuthenticationMiddleware())
    .add(new AuthorizationMiddleware())
    .add(new RedirectsMiddleware([
        {
            from: '/old-path',
            to: '/new-path',
        },
        {
            from: '/old-dashboard',
            to: '/dashboard',
            proxy: true,
        },
    ]))
    .build();

export async function middleware(req: NextRequest) {
    return middlewareChain.handle(req);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}