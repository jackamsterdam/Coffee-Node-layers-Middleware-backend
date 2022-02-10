import CoffeeModel from "../2-models/coffee-model";
import dal from "../3-data-access-layer/dal";


async function getAllCoffeesAsync(): Promise<CoffeeModel[]> {
    const coffees = await dal.getAllCoffeesAsync()
    return coffees
}

async function getOneCoffeeAsync(id: number): Promise<CoffeeModel> {
    const coffees = await dal.getAllCoffeesAsync()
    const coffee = coffees.find(c => c.id === id )
    return coffee
}

async function addOneCoffeeAsync(coffee: CoffeeModel): Promise<CoffeeModel> {
    const coffees = await dal.getAllCoffeesAsync()
    const id  = coffees[coffees.length-1].id + 1
    coffee.id = id 
    coffees.push(coffee)
    await dal.saveAllCoffeesAsync(coffees)
    return coffee 
}

async function updateFullCoffeeAsync(coffee: CoffeeModel): Promise<CoffeeModel> {
    const coffees = await dal.getAllCoffeesAsync()
    const indexToUpdate = coffees.findIndex(c => c.id === coffee.id)
     coffees[indexToUpdate] = coffee 
     await dal.saveAllCoffeesAsync(coffees)
     return coffee 
}

async function updatePartialCoffeeAsync(coffee: CoffeeModel): Promise<CoffeeModel> {
    const coffees = await dal.getAllCoffeesAsync() 
    

    const dbCoffee = coffees.find(c => c.id === coffee.id)

    for (const prop in coffee) {
        if (coffee[prop]) {
            dbCoffee[prop] = coffee[prop]
        }
    }



    await dal.saveAllCoffeesAsync(coffees)
    return dbCoffee
}

async function deleteCoffeeAsync(id: number) : Promise<void> {
    const coffees = await dal.getAllCoffeesAsync()

    const indexToDelete = coffees.findIndex(c => c.id === id) 
    coffees.splice(indexToDelete,1)
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