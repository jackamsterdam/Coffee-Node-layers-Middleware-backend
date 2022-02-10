import { NextFunction, Request, Response } from 'express';


function priceChecker(request: Request, response: Response, next: NextFunction): void {


   if (request.body.price === 0) {
       console.log('Weeee--Free Coffee!')
   }


    next()

}

export default priceChecker