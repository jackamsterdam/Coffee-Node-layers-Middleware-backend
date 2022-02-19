import express, { Request, Response, NextFunction } from 'express'
import { nextTick } from 'process'
import CoffeeModel from '../2-models/coffee-model'
import coffeesLogic from '../4-business-logic-layer/coffees-logic'
import logging from '../6-middleware/logger'
import priceChecker from '../6-middleware/price-checker'
import verifyAdmin from '../6-middleware/verify-admin'
import verifyLoggedIn from '../6-middleware/verify-logged-in'

const router = express.Router()

router.get('/api/coffees', async (request: Request, response: Response, next: NextFunction) => {
    try {

        console.log('request.body enter no body in get request  only sent in url', request.body);

        const coffees = await coffeesLogic.getAllCoffeesAsync()
        response.json(coffees)

    }
    catch (err: any) {  //?Btw its nice to see crashes get caught in catch and the entire program keeps running good.  ( thats why its good to log errors in error handlwer with windston casue you can see where the crashes wehre)
        next(err)
    }
})
//לחלץ אידי
router.get('/api/coffees/:id', async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('request.body enter no body in get request  only sent in url', request.body);
        const id = +request.params.id
        const coffee = await coffeesLogic.getOneCoffeeAsync(id)
        // if (!coffee) {   this if condition can be in bll instaead cause anyways all the errors are מתנקזים to here and then to error handler 
        //     next()
        // }
        response.json(coffee)  //this is the literal object coffee returned :   { id: 1, code: 2342, type: 'Arbiska', price: 2.98, strength: 1 }
    }
    catch (err: any) {  //errror object instance errorModel thrown from bll ends up here 
        next(err)  //err is an ojbect that is an instance of ErrorModel not Error
    }
})

router.post('/api/coffees', verifyLoggedIn, priceChecker, async (request: Request, response: Response, next: NextFunction) => {

    try {
        console.log('requiest.body before object oriented turinging from literal object to instance of coffeeeModel,', request.body); // does not have id !                  
        // LITERAL OBJECT WITH NO METHODS @@!!!!     { code: 8888, type: 'ChOCO', price: 0, strength: 1 }
        //   coffee.    see intelleiscence before!                       
        const coffee = new CoffeeModel(request.body)  //OBEJCT ORIENTED THINKING SUPER IMPORTANT 
        //   coffee.        see intelleiscence after!
        console.log("coffee (request.body converted to instanc of class)", coffee);
        //  CoffeeModel {          //?NOW ITS CONVERTED TO CLASSS INSTANCE WITH METHODS
        //     id: undefined,  (well at first will be undefined)
        //     code: 8888,
        //     type: 'ChOCO',
        //     price: 0,
        //     strength: 1
        //   }

        const addedCoffee = await coffeesLogic.addOneCoffeeAsync(coffee)
        response.status(201).json(addedCoffee)

    } catch (err: any) {
        next(err)
    }
})

router.put('/api/coffees/:id', [logging,verifyLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
    try {

        console.log('request.body enter', request.body); //{ code: 4444, type: 'MILK', price: 0, strength: 5 }

        const id = +request.params.id
        request.body.id = id
        const coffee = new CoffeeModel(request.body)
        console.log("request.body coffee after turned into class", coffee); // CoffeeModel { id: 1, code: 4444, type: 'MILK', price: 0, strength: 5 }

        const updatedCoffee = await coffeesLogic.updateFullCoffeeAsync(coffee)
        response.json(updatedCoffee)
    } catch (err: any) {
        next(err)
    }
})

router.patch('/api/coffees/:id', verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('request.body enter', request.body);    // { code: 9999999999 }  updating partial
        const id = +request.params.id
        request.body.id = id
        const coffee = new CoffeeModel(request.body)
        console.log("request.body coffee after turned into class", coffee);
        //   CoffeeModel {
        //     id: 1,     // we manually added this id 
        //     code: 9999999999,
        //     type: undefined,   case parital
        //     price: undefined,
        //     strength: undefined
        //   }
        const updatedCoffee = await coffeesLogic.updatePartialCoffeeAsync(coffee)
        console.log("updatedCoffee partially after returned from backend for in loop but stil a literal YES dbcoffee didnt suddenly turn into a coffeeModel! it jsut got the properties from the partial coffee instance  so the doSOMEHTING funciton you see is actually a property of coffee but that doesn tmake dbcoffee an instance ", updatedCoffee);
        //   {
        //     id: 1,
        //     code: 9999999999,
        //     type: 'MILK',
        //     price: 0,
        //     strength: 5,
        //     doSomething: [Function (anonymous)]  //במקרה קיבל את הפרופרטי של הפונקציה הזאת גם בלופ של for in 
        //   }
        console.log(updatedCoffee.doSomething())
        response.json(updatedCoffee)
    } catch (err: any) {
        next(err)
    }
})

router.delete('/api/coffees/:id', verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
// router.delete('/api/coffees/:id',[verifyLoggedIn, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('request.body enter', request.body); //{}
        const id = +request.params.id
        await coffeesLogic.deleteCoffeeAsync(id)
        response.sendStatus(204)

    } catch (err: any) {
        next(err)
    }
})


export default router