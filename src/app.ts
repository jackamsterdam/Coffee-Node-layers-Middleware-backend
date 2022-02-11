import express from 'express'
import coffeesController from './5-controllers/coffees-controller'
import errorsHandler from './6-middleware/errors-handler'
import log from './6-middleware/log'
import preventGarbage from './6-middleware/prevent-garbage'
const server = express()

server.use(express.json())

server.use(log)

server.use(preventGarbage)
server.use('/', coffeesController)




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
//     catch(err: any) {console.log(err);
//     }
// })()