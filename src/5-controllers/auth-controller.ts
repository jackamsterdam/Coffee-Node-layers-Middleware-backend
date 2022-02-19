
import express, { NextFunction, Request, Response } from 'express'
import CredentialsModel from '../2-models/credentials-model'
import RoleEnum from '../2-models/role-enum'
import UserModel from '../2-models/user-model'
import authLogic from '../4-business-logic-layer/auth-logic'

const router = express.Router()



router.post('/api/auth/register', async (request: Request, response: Response, next: NextFunction) => {
    try {
        //Change request.body literal to be instance of clas with methods of joi validation etc...
        console.log('requet.body before converted to instance of UserModel:', request.body)
        // {
        //     firstName: 'Kermit',
        //     lastName: 'The Frog',
        //     username: 'Kermit',
        //     password: '123456'
        //   }
        const user = new UserModel(request.body)


        // Create "User" role: 
        user.role = RoleEnum.User //doesnt matter what they give me i make the user  a user and not admin

        console.log('requet.body after converted to instance of UserModel and added ROle to it:', user)
        // UserModel {
        //     id: undefined,
        //     firstName: 'Kermit3',
        //     lastName: 'The Frog',
        //     username: 'Kermit',
        //     password: '123456',
        //     role: 1
        //   }

            // if (await authLogic.isUsernameTaken(user.username)) return response.status(400).send(`Username ${user.username} already taken`)


        const token = await authLogic.registerAsync(user)
        console.log("token in controller", token);
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwiZmlyc3ROYW1lIjoiS2VybWl0IiwibGFzdE5hbWUiOiJUaGUgRnJvZyIsInVzZXJuYW1lIjoiS2VybWl0IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJyb2xlIjoxfSwiaWF0IjoxNjQ0OTgxNDUyLCJleHAiOjE2NDQ5ODg2NTJ9.0XpxctiNzeNq_p8C0qzPjdtQQKamcbw-wUqZgxKWXAI
        
        response.status(201).json(token)
    }
    catch (err: any) {
        next(err)
    }

})

router.post('/api/auth/login', async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('requet.body before converted to instance of Credentialsmodel', request.body)  //{ username: 'Kermit', password: '123456' }

        const credentials = new CredentialsModel(request.body)

        console.log('requet.body after converted to instance of Credentialsmodel', credentials)  // CredentialsModel { username: 'Kermit', password: '123456' }

        const token = await authLogic.loginAsync(credentials)
        console.log("token in controller", token);
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdE5hbWUiOiJLZXJtaXQiLCJsYXN0TmFtZSI6IlRoZSBGcm9nIiwidXNlcm5hbWUiOiJLZXJtaXQiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInJvbGUiOjF9LCJpYXQiOjE2NDQ5ODE0ODgsImV4cCI6MTY0NDk4ODY4OH0.EDbYMCkYrZd93WI4IM2-5r8AcfNf2TuUKgmUzaQ3_EA
      
       response.json(token)
    }
    catch (err: any) {
        next(err)
    }

})


export default router