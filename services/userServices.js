import db from '../models/index.js'
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from './jwtServices.js';
const salt = bcrypt.genSaltSync(10);
const createUserServices = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
        let userData = {}
        // check field invalid
        if(!user.email || !user.password || !user.confirmPassword ){
            resolve({
                errCode: 2,
                errMessage: `Missing parameters !!!`
            })
        }else{
            // check email is exist
            let isExist = await checkExist(user.email);
                if(!isExist){
                    // check confirm
                    if(user.password !== user.confirmPassword){
                        resolve({
                            errCode: 3,
                            errMessage: `Confirm password is not password you typed !!!`
                        })
                    }else{
                        let hashedPassword = await hashPasswordUser(user.password)
                        let newUser = await db.User.create({
                            email: user.email,
                            password: hashedPassword,
                            name: user.name,
                        })
                        userData.errCode = 0,
                        userData.errMessage = `Created ~~~`
                        //userData.user = userCreated
                    }
                }else{
                    userData.errCode = 1
                    userData.errMessage = `This email is exist already, please try another email !!!`
                }
            }
            resolve(userData)
    } catch(e) {
        reject(e)
    }
  })
}
const hashPasswordUser = (userPassword) => {
   return new Promise( async (resolve,reject) => {
        try{
            var hashPassword = await bcrypt.hashSync(userPassword, salt);
            resolve(hashPassword)
        }catch(e){
            reject(e)
        }
       
    })
}
const checkExist = async (userEmail) => {
    return new Promise( async (resolve, reject) => {
    try {
        let user = await db.User.findOne({
            where: {email: userEmail}
        })
        if(user){
            resolve(true)
        }else{
            resolve(false)
        }
    } catch(e) {
      reject(e)
    }
  })
}
const loginServices = (userEmail,userPassword,res) => {
    return new Promise (async (resolve,reject)=> {
        try{
            if(!userEmail || !userPassword){
                resolve({
                    errCode: 1,
                    errMessage: `You missing parameter !!!`
                })
            }else{
                // check email
                let checkEmail = await checkExist(userEmail)
                if(checkEmail){
                    // compare password
                    let user = await db.User.findOne({
                        where: {email : userEmail}
                    })
                    let checkPassword = await bcrypt.compareSync(userPassword,user.password);
                    if(checkPassword){
                        let access_token = await generateAccessToken({id: user.id,admin: user.admin})
                        console.log(`check access_token: `,access_token)
                        let refresh_token = await generateRefreshToken({id: user.id,admin: user.admin})
                        res.cookie("refresh_token",refresh_token,{
                            httpOnly: true,
                            secure: false,
                            path:'/',
                            sameSite: 'strict'
                        })
                        resolve({
                            errCode: 0,
                            errMessage: `Login successfully !!!`,
                            access_token: access_token
                        })
                    }else{
                        resolve({
                            errCode: 2,
                            errMessage: `Wrong password ~~~`
                        })
                    }
                }else{
                    resolve({
                        errCode: 3,
                        errMessage: `The email is not exist`
                    })
                }
            }
        }catch(e){
            console.log(e)
        }
    })
}
module.exports = {
  createUserServices: createUserServices,
  loginServices: loginServices
}
