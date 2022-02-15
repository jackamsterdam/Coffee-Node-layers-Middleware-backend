import {NextFunction, Request, Response } from "express";




function errorsHandler(err: any, request: Request, response: Response, next: NextFunction): void {
   // if doesnt have a status (a js error that casues crash) then 500 otherwise if has status print it 
   response.status(err.status || 500).send(err.message)
    
}

export default errorsHandler