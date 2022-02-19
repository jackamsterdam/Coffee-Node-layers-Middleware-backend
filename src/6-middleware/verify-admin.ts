import { NextFunction, Request, Response } from 'express';
import ErrorModel from '../2-models/error-model';
import RoleEnum from '../2-models/role-enum';
import cyber from '../7-utils/cyber';




async function verifyAdmin(request: Request, response: Response, next: NextFunction):Promise<void>  {
//  try { //if you forget await you have crash try catch saves us
    const authorizationHeader = request.header('authorization')
    const isValid = await cyber.verifyToken(authorizationHeader)

    if (!isValid) {
        console.log('enter?')
        next(new ErrorModel(401, 'You are not logged in'))
        return //without this you get undefined.split() so error  cuase it continues
    }

    // console.log('hihihihhhhhhhhhhhhhh')
    const user = cyber.getUserFromToken(authorizationHeader)

    if (user.role !== RoleEnum.Admin) {
        next(new ErrorModel(403, `You are not authorized `))
        return
    }



    next()
//  } catch (error:any) {
//      next(error)
//  }
   
}

export default verifyAdmin

