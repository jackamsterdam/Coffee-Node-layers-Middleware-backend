import {Request, Response, NextFunction} from 'express'

function logging(request: Request, response: Response, next: NextFunction): void {
  console.log('request.body: in logging middleware', request.body)
 //there is no id sent cant read it!! 
  console.log(`User is going to update data ${request.body.id}`)  //reqest.method
  

  next()
}

export default logging 