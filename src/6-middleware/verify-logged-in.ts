import { NextFunction, Request, Response } from "express";
import ErrorModel from "../2-models/error-model";
import cyber from "../7-utils/cyber";



async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {  //not arrow but routers are with arrow pay attention
     const authorizationHeader = request.header('authorization') // Suppose to be "Bearer the-token"
     const isValid = await cyber.verifyToken(authorizationHeader)

     if (!isValid) {
         next(new ErrorModel(401, `You are not logged in`))
         return //why do i need return ???????????????????????????
     }

     next()
}

export default verifyLoggedIn