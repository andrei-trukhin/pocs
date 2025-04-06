import {AbstractMiddlewareChain} from "@/middleware-chain/abstract-middleware-chain";
import {NextMiddleware, NextRequest, NextResponse} from "next/server";
import {ChainHandler} from "@/middleware-chain/chain-handler";

export class AuthenticationMiddleware extends AbstractMiddlewareChain {

    protected handleRequest(data: NextRequest, next: ChainHandler['handle']): ReturnType<NextMiddleware> {
        // Perform authentication logic here
        console.log('Authentication Middleware');

        // Check if the user is authenticated
        const isAuthenticatedUser = isAuthenticated(data);
        if (!isAuthenticatedUser) {
            // If not authenticated, redirect to the login page
            const loginUrl = new URL('/login', data.url);
            return NextResponse.redirect(loginUrl);
        }

        // Call the next middleware in the chain
        return next(data);
    }

}

function isAuthenticated(request: NextRequest): boolean {
    // Implement your authentication logic here
    // For example, check for a valid session or token
    return true; // Placeholder, replace with actual logic
}