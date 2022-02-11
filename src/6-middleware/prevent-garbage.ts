// not part of hw 

import { NextFunction, Request, Response } from "express";

function preventGarbage(request: Request, response: Response, next: NextFunction): void {
    for (const prop in request.body) {
        if (typeof request.body[prop] === 'string' && request.body[prop].length > 100) {
            //  response.status(400).json('Data too long')
            next({ status: 400, message: 'Data too long' })
            return
        }
    }
    next()
}

export default preventGarbage


