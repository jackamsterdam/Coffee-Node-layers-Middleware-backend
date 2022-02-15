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

  doSomething() {
    return` You can call using request.body cause reqest.body is not a literal object anymore but now it has more capibilites so you can see in intelleiscence this method whereas before you didnt. Now request.body object is a instance of class CoffemModel and inherits all methods. this.id: ${this.code} this.code:  ${this.code} this.type: ${this.type}`
  }














  
}

export default CoffeeModel

