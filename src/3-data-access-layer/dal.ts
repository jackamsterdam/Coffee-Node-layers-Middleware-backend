
import fs from 'fs/promises'
import CoffeeModel from '../2-models/coffee-model'
import UserModel from '../2-models/user-model'

const CoffeeAbsolutePath = './src/1-database/coffees.json'
const UserAbsolutePath = './src/1-database/users.json'

async function getAllCoffeesAsync(): Promise<CoffeeModel[]> {
  const content = await fs.readFile(CoffeeAbsolutePath, 'utf-8')
  const coffees: CoffeeModel[] = JSON.parse(content)
  return coffees
}

async function saveAllCoffeesAsync(coffees: CoffeeModel[]):Promise<void> {
    const content = JSON.stringify(coffees, null, 4)
     await fs.writeFile(CoffeeAbsolutePath, content)
}
//UserModel Collection []
async function getAllUsersAsync(): Promise<UserModel[]> {
  const content = await fs.readFile(UserAbsolutePath, 'utf-8')
  const users: UserModel[] = JSON.parse(content)
  return users 
}

async function saveAllUsersAsync(users: UserModel[]): Promise<void> {
  const content = JSON.stringify(users, null, 4) //save json using indentation
 await fs.writeFile(UserAbsolutePath,content)
}







//i tested in app that these functions work now i can move on

export default {
    getAllCoffeesAsync,
    saveAllCoffeesAsync,
    getAllUsersAsync,
    saveAllUsersAsync
}