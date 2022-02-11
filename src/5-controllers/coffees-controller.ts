import express, {Request, Response} from 'express'
import CoffeeModel from '../2-models/coffee-model'
import coffeesLogic from '../4-business-logic-layer/coffees-logic'
import logging from '../6-middleware/logger'
import priceChecker from '../6-middleware/price-checker'

const router = express.Router()

router.get('/api/coffees', async(request: Request, response: Response) => {
     const coffees = await coffeesLogic.getAllCoffeesAsync()
     response.json(coffees)
})
//לחלץ אידי
router.get('/api/coffees/:id', async(request: Request, response: Response) => {
    const id = +request.params.id
    const coffee = await coffeesLogic.getOneCoffeeAsync(id)
    response.json(coffee)
})

router.post('/api/coffees',priceChecker, async(request: Request, response: Response) => {
    try {
         const coffee = new CoffeeModel(request.body)
    const addedCoffee = await coffeesLogic.addOneCoffeeAsync(coffee)
    response.status(201).json(addedCoffee)
    } catch(err: any) {
        console.log(err)
    }
   
})

router.put('/api/coffees/:id', logging, async(request: Request, response: Response) => {
    const id = +request.params.id 
    request.body.id = id 
    const coffee = new CoffeeModel(request.body)
    const updatedCoffee = await coffeesLogic.updateFullCoffeeAsync(coffee)
    response.json(updatedCoffee)
})

router.patch('/api/coffees/:id', async(request: Request, response: Response) => {
  const id = +request.params.id
  request.body.id = id 
  const coffee = new CoffeeModel(request.body)
  const updatedCoffee = await coffeesLogic.updatePartialCoffeeAsync(coffee)
  response.json(updatedCoffee)
})

router.delete('/api/coffees/:id', async(request: Request, response:Response) => {
    const id = +request.params.id 
    await coffeesLogic.deleteCoffeeAsync(id)
    response.sendStatus(204)
})


export default router