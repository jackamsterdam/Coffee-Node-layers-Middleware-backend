class CoffeeModel {
  id: number
  code: number
  type: string
  price: number
  strength: number

  constructor(coffee: CoffeeModel) {  //Copy Constructor
      this.id = coffee.id 
      this.code = coffee.code
      this.type = coffee.type 
      this.price = coffee.price 
      this.strength = coffee.strength
  }
}

export default CoffeeModel

