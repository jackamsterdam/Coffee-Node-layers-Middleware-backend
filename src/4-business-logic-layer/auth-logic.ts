import UserModel from '../2-models/user-model'
import CredentialModel from '../2-models/credentials-model'
import ErrorModel from '../2-models/error-model'
import dal from '../3-data-access-layer/dal'
import cyber from '../7-utils/cyber'



async function registerAsync(user: UserModel): Promise<string> {
    // joi validation 400 errors:     // Validation...
    const error = user.validatePost()
    if (error) {
        throw new ErrorModel(400, error)
    }

    // Get all users (in real database we don't need it)
    const users = await dal.getAllUsersAsync()

    // hw check: 
     const duplicate = users.find(u => u.username === user.username)
     console.log("duplicate", duplicate);
     if (duplicate) {  //rmember first negative in if
         throw new ErrorModel(400, 'User already exists')
     }



    user.id = users[users.length-1].id + 1

   
console.log('user after id aded', user)
// UserModel {
//     id: 6,
//     firstName: 'Kermit3',
//     lastName: 'The Frog',
//     username: 'Kermit',
//     password: '123456',
//     role: 1
//   }

 // Add user to collection: 
    users.push(user)

    // Save back the new user:
 await dal.saveAllUsersAsync(users)

 // Generate token: 
    const token = cyber.getNewToken(user)
    console.log("token in bll", token);
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZmlyc3ROYW1lIjoiS2VybWl0IiwibGFzdE5hbWUiOiJUaGUgRnJvZyIsInVzZXJuYW1lIjoiS2VybWl0IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJyb2xlIjoxfSwiaWF0IjoxNjQ0OTgxNDUyLCJleHAiOjE2NDQ5ODg2NTJ9.0XpxctiNzeNq_p8C0qzPjdtQQKamcbw-wUqZgxKWXAI
   

    // return token with user 
    return token


}


async function loginAsync(credentials: CredentialModel): Promise<string> {
    console.log('user credentials enter loginasync function', credentials)  //{ username: 'Kermit', password: '123456' }
      // Validation...
    const error = credentials.validatePost()
    if (error) {
        throw new ErrorModel(400, error)
    }

    // Get all users (in real database we don't need it)
    const users = await dal.getAllUsersAsync()
       // Find that user:
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password)
    // If user does not exist:
    if(!user) {
        throw new ErrorModel(401, `Incorrect username or password`)
    }

    // Generate token: 
    const token = cyber.getNewToken(user)
    console.log("token in bll", token + '<br/><br/><br/>');
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJLZXJtaXQiLCJsYXN0TmFtZSI6IlRoZSBGcm9nIiwidXNlcm5hbWUiOiJLZXJtaXQiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInJvbGUiOjF9LCJpYXQiOjE2NDQ5ODE0ODgsImV4cCI6MTY0NDk4ODY4OH0.EDbYMCkYrZd93WI4IM2-5r8AcfNf2TuUKgmUzaQ3_EA
  



    // return token with user 
    return token

}




export default {
  registerAsync,
  loginAsync
}