import { NextFunction, Request, Response } from 'express';

function log(request: Request, response: Response, next: NextFunction): void {
    const now = Date.now()

    console.log(`Date and Time: ${now.toLocaleString()}
               Request has been made using method: ${request.method}
               Using Route: ${request.originalUrl}
               `)
    next()
}


export default log 