import {NextMiddleware, NextRequest} from "next/server";

export interface ChainHandler {
    handle(data: NextRequest): ReturnType<NextMiddleware>;
}