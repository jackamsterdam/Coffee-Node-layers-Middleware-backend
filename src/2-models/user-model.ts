import Joi, { required } from "joi"
import RoleEnum from "./role-enum"

class UserModel {
    id: number
    firstName: string
    lastName: string 
    username: string 
    password: string 
    role: RoleEnum

    constructor(user: UserModel) { //copy constructor to convert request.body to instance instaead of object literal 

        this.id = user.id 
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.username = user.username
        this.password = user.password
        this.role = user.role   
    }
//private cause we want only validatePost method to use and static cause we want the schema made only once בתחילת התכנית and not for every instance of UserModel
    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(4).max(20),
        password: Joi.string().required().min(4).max(20),
        role: Joi.number().required().integer().min(RoleEnum.User).max(RoleEnum.Admin)
    })

    validatePost(): string {
        const result = UserModel.postValidationSchema.validate(this, {abortEarly: false})
        return result.error?.message
    }

    private static putValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        username: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(10).max(20),
        role: Joi.number().required().integer().min(RoleEnum.User).max(RoleEnum.Admin)
    })

    validatePut(): string {
        const result = UserModel.putValidationSchema.validate(this, {abortEarly: false})
        return result.error?.message
    }

}

export default UserModel