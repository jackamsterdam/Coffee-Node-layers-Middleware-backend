
import fs from 'fs/promises'
import CoffeeModel from '../2-models/coffee-model'

const fileAbsolutePath = './src/1-database/coffee.json'

async function getAllCoffeesAsync(): Promise<CoffeeModel[]> {
  const content = await fs.readFile(fileAbsolutePath, 'utf-8')
  const coffees: CoffeeModel[] = JSON.parse(content)
  return coffees
}

async function saveAllCoffeesAsync(coffees: CoffeeModel[]):Promise<void> {
    const content = JSON.stringify(coffees, null, 4)
     await fs.writeFile(fileAbsolutePath, content)
}

//i tested in app that these functions work now i can move on

export default {
    getAllCoffeesAsync,
    saveAllCoffeesAsync
}