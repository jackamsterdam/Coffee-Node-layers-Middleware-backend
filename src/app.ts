import express, {Request, Response, NextFunction} from 'express'
import ErrorModel from './2-models/error-model'
import coffeesController from './5-controllers/coffees-controller'
import authController from './5-controllers/auth-controller'
import errorsHandler from './6-middleware/errors-handler'
import log from './6-middleware/log'
import preventGarbage from './6-middleware/prevent-garbage'
const server = express()

//how to block everything at once with middleware without login? 

server.use(express.json())

server.use(log)

server.use(preventGarbage)  //thats a reference to preventGarbage function which is a middleware function so sanme thing like putting for * below a middleware function

server.use('/', authController)
server.use('/', coffeesController)

// Route not found:
server.use('*', (request: Request, response: Response, next: NextFunction) => {  //doesnt need to be async?
    // next({status: 404, message: 'Route not found'})  //Red alert- you  are making this object many times you can make a mistake so better to create a class instance 
    // console.log('error sent to error handler',new ErrorModel(404, 'Route not found'))
    
    next(new ErrorModel(404, 'Route not found.'))
})



server.use(errorsHandler) // Catch-All Middleware

server.listen(3001, () => console.log('Listening on port 3001...'))






// Testing: 
// import dal from './3-data-access-layer/dal'


// (async function() {
//     try {
//         const coffees = await dal.getAllCoffeesAsync()
//         console.log("coffees", coffees);
//        coffees.push({"id":999, "code": 99999, "type": "test", "price": 9.99,"strength": 9})
//        await dal.saveAllCoffeesAsync(coffees)
//     }
//     catch(err: any) {console.log(err)
//     }
// })()


// part 2 check: 
// import dal from './3-data-access-layer/dal'


// (async function() {
//   try {
//        const users = await dal.getAllUsersAsync()
//     console.log("users before", users);

//     users.push({
//         "id": 233,
//         "firstName": "Moishe",
//         "lastName": "Ufnik",
//         "username": "Moishe",
//         "password": "1234",
//         "role": 1
//     })

//     await dal.saveAllUsersAsync(users)
//     console.log("users after", users);
//   } catch (err: any) {
//       console.log(err)
//   }
   

// })()