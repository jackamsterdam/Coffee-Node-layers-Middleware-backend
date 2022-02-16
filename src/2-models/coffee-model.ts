import Joi from "joi"
import strengthEnum from "./strength-enum"

class CoffeeModel {
  id: number
  code: number
  type: string
  price: number
  strength: strengthEnum

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

    //Validation with JOI 400 Errors ( that front end should handle)

    private static postValidationSchema = Joi.object({
      id: Joi.forbidden(),
      code: Joi.number().required(),
      type: Joi.string().required().min(2).max(100),
      price: Joi.number().required().positive().min(1).max(10000),  //.integer()
      strength: Joi.string().required()
    })
// name: Joi.string().required().min(2).max(100).regex(/^[A-Z].*$/)
    validatePost(): string {
      const result = CoffeeModel.postValidationSchema.validate(this, {abortEarly: false})
      return result.error?.message
    }

    private static putValidationSchema = Joi.object({
      id: Joi.number().optional(),
      code: Joi.number().required().min(2).max(100),
      type: Joi.string().required().min(2).max(100),
      price: Joi.number().required().positive().min(1).max(10000),
      strength: Joi.string().required()

    })

    validatePut(): string {
      const result = CoffeeModel.putValidationSchema.validate(this, {abortEarly: false})
      return result.error?.message
    }

    private static patchValidationSchema = Joi.object({
      id: Joi.number().optional(),
      code: Joi.number().optional().min(2).max(100),
      type: Joi.string().optional().min(2).max(100),
      price: Joi.number().optional().positive().min(1).max(10000),
      strength: Joi.string().optional()
    })

    validatePatch(): string {
      const result = CoffeeModel.patchValidationSchema.validate(this, {abortEarly: false})
      return result.error?.message
    }











  
}

export default CoffeeModel

