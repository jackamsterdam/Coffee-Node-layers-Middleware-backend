import {Request, Response, NextFunction} from 'express'

function logging(request: Request, response: Response, next: NextFunction): void {
  console.log(`User is going to update data ${request.id}`)  //reqest.method

  next()
}

export default logging 