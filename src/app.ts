import express from 'express'
import coffeesController from './5-controllers/coffees-controller'
import log from './6-middleware/log'

const server = express()

express.use(express.json())

server.use(log)

server.use('/', coffeesController)






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