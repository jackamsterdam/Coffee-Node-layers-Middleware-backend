import CoffeeModel from "../2-models/coffee-model";
import ErrorModel from "../2-models/error-model";
import dal from "../3-data-access-layer/dal";


async function getAllCoffeesAsync(): Promise<CoffeeModel[]> {

    const coffees = await dal.getAllCoffeesAsync()
    console.log('coffees', coffees)   
    // [
    //     { id: 1, code: 2342, type: 'Arbiska', price: 2.98, strength: 1 },
    //     { id: 2, code: 4423, type: 'Vanilla', price: 4.98, strength: 3 },
    //     { id: 3, code: 5323, type: 'Espresso', price: 7.98, strength: 5 }
    //   ]
    return coffees
}

async function getOneCoffeeAsync(id: number): Promise<CoffeeModel> {
    const coffees = await dal.getAllCoffeesAsync()
    const coffee = coffees.find(c => c.id === id )

    if (!coffee) {  //only routes that deal with wrong id that means the resource not found so only get one , put patch and delete
        // next({status: 404, `Resource with id ${id} not found.`})
        throw new ErrorModel(404, `Resource with id ${id} not found`) //! NaN if you send  http://localhost:3001/api/coffees/787487dfgdf so you can make a check to see if NaN
        // throw Error  // will be 500 if you just throw Error
    }

    console.log("coffee", coffee);  //coffee { id: 1, code: 2342, type: 'Arbiska', price: 2.98, strength: 1 } literal
    return coffee
}

async function addOneCoffeeAsync(coffee: CoffeeModel): Promise<CoffeeModel> {
    //Add joi validation
    
    const error = coffee.validatePost()
    if (error) {
        throw new ErrorModel(400, error)
    }

    const coffees = await dal.getAllCoffeesAsync()
    const id  = coffees[coffees.length-1].id + 1
    console.log('coffee before id', coffee)
    // CoffeeModel {
    //     id: undefined,
    //     code: 8888,
    //     type: 'ChOCO',
    //     price: 0,
    //     strength: 1
    //   }
    coffee.id = id 
    console.log('coffee after id', coffee)  //CoffeeModel { id: 4, code: 8888, type: 'ChOCO', price: 0, strength: 1 }
    coffees.push(coffee)
    await dal.saveAllCoffeesAsync(coffees)
    return coffee 
}

async function updateFullCoffeeAsync(coffee: CoffeeModel): Promise<CoffeeModel> {
//if you have an error make sure its on json in postman and not text
    //Joi error: 
    const error = coffee.validatePut()
    if (error) {
        throw new ErrorModel(400, error)
    }


    const coffees = await dal.getAllCoffeesAsync()
    const indexToUpdate = coffees.findIndex(c => c.id === coffee.id)
    if (indexToUpdate === -1) {
        throw new ErrorModel(404, `Resource with id ${coffee.id} not found`)
    }
    console.log('coffee ', coffee)     //CoffeeModel { id: 1, code: 4444, type: 'MILK', price: 0, strength: 5 }
    
    console.log('coffees ARRAY before updated', coffees);
    // [
    //     { id: 1, code: 2342, type: 'Arbiska', price: 2.98, strength: 1 },
    //     { id: 2, code: 4423, type: 'Vanilla', price: 4.98, strength: 3 },
    //     { id: 3, code: 5323, type: 'Espresso', price: 7.98, strength: 5 },
    //     { id: 4, code: 8888, type: 'ChOCO', price: 0, strength: 1 }
    //   ]
    
     coffees[indexToUpdate] = coffee 
     console.log('coffees after updated', coffees);
    //  [
    //     CoffeeModel {    //HAHA cool this object is an instance object cause got replaced with the instance but all other are still literal object 
    //       id: 1,
    //       code: 4444,
    //       type: 'MILK',
    //       price: 0,
    //       strength: 5
    //     },
    //     { id: 2, code: 4423, type: 'Vanilla', price: 4.98, strength: 3 },
    //     { id: 3, code: 5323, type: 'Espresso', price: 7.98, strength: 5 },
    //     { id: 4, code: 8888, type: 'ChOCO', price: 0, strength: 1 }
    //   ]
     await dal.saveAllCoffeesAsync(coffees)
     return coffee 
}

async function updatePartialCoffeeAsync(coffee: CoffeeModel): Promise<CoffeeModel> {

   const error = coffee.validatePatch()
   if (error) {
       throw new ErrorModel(400, error)
   }


    const coffees = await dal.getAllCoffeesAsync() 
    console.log('coffees before updated', coffees);
    // coffees before updated [
    //     { id: 1, code: 4444, type: 'MILK', price: 0, strength: 5 },
    //     { id: 2, code: 4423, type: 'Vanilla', price: 4.98, strength: 3 },
    //     { id: 3, code: 5323, type: 'Espresso', price: 7.98, strength: 5 },
    //     { id: 4, code: 8888, type: 'ChOCO', price: 0, strength: 1 }
    //   ]


    const dbCoffee = coffees.find(c => c.id === coffee.id)
    if (!dbCoffee) {
        throw new ErrorModel(404, `Resource with id ${coffee.id} not found`)
    }
    console.log("dbCoffee refernce before patched", dbCoffee);  // { id: 1, code: 4444, type: 'MILK', price: 0, strength: 5 } literal
    console.log('coffee that got turned into an object in controller', coffee)
    // CoffeeModel {      we will loop this instance  with dbcoffee literal reference
    //     id: 1,
    //     code: 9999999999,
    //     type: undefined,
    //     price: undefined,
    //     strength: undefined
    //   }

    for (const prop in coffee) {
        if (coffee[prop]) {  //lol if you wrote above if (dbcofee) instead of if (!dbcoffee ) you would get error cannot set of undefined lol cause dbcoffee is undefined.id lol
            dbCoffee[prop] = coffee[prop]
            // only these two properties are in coffee[prop] and they will update the refernce dbCoffee ( and the funciton is alos a property so that will be updated as weell)
            // id: 1,
            //     code: 9999999999,
            //? and also the function do somehting  lol 
        }
    }
    console.log("dbCoffee refernce after patched", dbCoffee);
    // dbCoffee refernce after patched {
    //     id: 1,
    //     code: 9999999999,
    //     type: 'MILK',
    //     price: 0,
    //     strength: 5,
    //     doSomething: [Function (anonymous)]  //lol yeah because coffee is actually an instance so has this method also so dbcoffee will get it also  !! 
    //   }



    await dal.saveAllCoffeesAsync(coffees)
    return dbCoffee
}

async function deleteCoffeeAsync(id: number) : Promise<void> {
    const coffees = await dal.getAllCoffeesAsync()
console.log('id',id);  //1
console.log('coffees before delete', coffees)
// [
//     { id: 1, code: 4444, type: 'MILK', price: 0, strength: 5 },
//     { id: 2, code: 4423, type: 'Vanilla', price: 4.98, strength: 3 },
//     { id: 3, code: 5323, type: 'Espresso', price: 7.98, strength: 5 },
//     { id: 4, code: 8888, type: 'ChOCO', price: 0, strength: 1 }
//   ]

    const indexToDelete = coffees.findIndex(c => c.id === id) 
    if (indexToDelete === -1) {
        throw new ErrorModel(404, `Resource with id ${id} not found.`)
    }
    coffees.splice(indexToDelete,1)
    console.log('coffees after delete', coffees)
    // [
    //     { id: 2, code: 4423, type: 'Vanilla', price: 4.98, strength: 3 },
    //     { id: 3, code: 5323, type: 'Espresso', price: 7.98, strength: 5 },
    //     { id: 4, code: 8888, type: 'ChOCO', price: 0, strength: 1 }
    //   ]

    await dal.saveAllCoffeesAsync(coffees)
}







export default {
    getAllCoffeesAsync,
    getOneCoffeeAsync,
    addOneCoffeeAsync,
    updateFullCoffeeAsync,
    updatePartialCoffeeAsync,
    deleteCoffeeAsync
}