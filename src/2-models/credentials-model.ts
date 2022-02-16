import Joi from 'joi';
class CredentialsModel {
   username: string
   password: string


   constructor(credentials: CredentialsModel) {  //he wrote user for some reason cause he copy pasted lol but i think technically its credentials
       this.username = credentials.username
       this.password = credentials.password
   }

   private static postValidationSchema = Joi.object({
       username: Joi.string().required().min(4).max(20),
       password: Joi.string().required().min(4).max(20)
   })

   validatePost(): string {
       const result = CredentialsModel.postValidationSchema.validate(this, {abortEarly: false})
       return result.error?.message
   }
}

// nobody does put on credentials /

export default CredentialsModel