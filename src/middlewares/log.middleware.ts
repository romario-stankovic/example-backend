import { NextFunction, Request, Response } from "express";

// A middleware function that logs the duration of each request to the console
export async function logMiddleware(req: Request, res: Response, next: NextFunction) {
    // Get the timestamp of the request in the format of "YYYY-MM-DD HH:MM:SS"
    const date = `${new Date().toISOString().replace("T", " ").replace("Z", "").substring(0, 19)}`;

    // Get the start time of the request
    const start = performance.now();
    // Call the next middleware in the chain or the route handler
    next();
    // Get the end time of the request
    const end = performance.now();

    // Calculate the duration of the request in milliseconds
    const ms = Math.ceil(end - start);

    // Log the request details to the console
    console.log(`[${date}] ${req.method} ${req.originalUrl} took ${ms}ms`);
}
