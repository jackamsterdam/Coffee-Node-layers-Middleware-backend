import jwt from 'jsonwebtoken'
import UserModel from '../2-models/user-model'
//?why did these two function not use promises but the middle one did??
// jwt-helper.ts you call this file also
const secretKey = 'KittensAreCute'

function getNewToken(user: UserModel): string {
    // The object we're setting inside the token: 
    const payload = { user }

    // Generate token: 
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' })

    return token
}


// Verify token:
async function verifyToken(authorizationHeader: string): Promise <boolean> {
    return new Promise((resolve, reject) => {
        // If there is no authorization header:
        if (!authorizationHeader) {
            resolve(false)
            return  //why do i need this
        }
        // Extract the token ("Bearer given-token"): 
        const token = authorizationHeader.split(' ')[1]

        // If there is no token: 
        if (!token) {
            resolve(false)
            return  //why do i need this
        }

        // Here we have a token:   
        jwt.verify(token, secretKey, err => {  //takes payload also {user} but we have no use for it we are not showing it 
            if (err) {
                resolve(false)
                return  //why do i need this
            }

                // Here the token is legal: }
         resolve(true)
        })


       
    })
}

function getUserFromToken(authorizationHeader: string): UserModel {
console.log('authorizaionheader', authorizationHeader)
    //Extract token
    const token = authorizationHeader.split(' ')[1]

    //Extract payload from the token  //payload = {{}}
    const payload:any = jwt.decode(token)

    //Extract user   //user {}
    const user = payload.user 
    return user   //and inside user {} we hae the role 
}








export default {
    getNewToken,
    verifyToken,
    getUserFromToken
}



