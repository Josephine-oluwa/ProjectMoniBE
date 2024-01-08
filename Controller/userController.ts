import bcrypt from "bcrypt"
import crypto from "crypto"
import userModel from "../Model/userModel"
import { statusCode } from "../utils/statusCode"
import express, {Request, Response} from "express"
import { verifiedEmail } from "../utils/email"


export  const createUser = async (req: Request, res: Response) => {
    try {
       const {email, password, userName}  = req.body 

       const salt = await bcrypt.genSalt(10)
       const hashed = await bcrypt.hash(password, salt)
       const token = crypto.randomBytes(10).toString("hex")

       const user = await userModel.create({
        email, userName, password: hashed, token, verify: false
       })

       verifiedEmail(user).then(() => {
        console.log("done")
       })

       return res.status(statusCode.CREATED).json({
        message:" created",
        data: user
       })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "unable to create",
            data: error
        })
    }
}



export const verifyUser = async (req: Request, res: Response) => {
    try {
const userID = req.params

const user = await userModel.findById(userID)

if (user){
   if (user.token !== "") {

    await userModel.findByIdAndUpdate(
        userID, 
        {
            token: "",
            verified: true
        }, 
        {new: true}
    )
    return res.status(statusCode.CREATED).json({
        message: "Account verified"
    })
   } else {
    return res.status(statusCode.BAD_REQUEST).json({
        message:  "user cannot be verified"
    })
   }
} else {
    return res.status(statusCode.BAD_REQUEST).json({
        message:  "user does not exist"
    })
}
    } catch (error:any) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "error"
        })
    }
}

export const readAllUser = async (req: Request, res: Response) => {
    try {
        const user = await userModel.find()

        return res.status(statusCode.CREATED).json({
            message: " viewing all users",
            data: user
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: " cannot view all users",
            data: error
        })
    }
}

export const readUserByLevel = async (req: Request, res: Response) => {
    try {
        const {level} = req.body;



        const user = await userModel.find({level})

        return res.status(statusCode.CREATED).json({
            message: " viewing user level",
            data: user
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: " cannot view all users",
            data: error
        })
    }
}


export const readOneUser = async (req: Request, res: Response) => {
    try {
        const {userID} = req.params;

        const user = await userModel.findById(userID)

        return res.status(statusCode.CREATED).json({
            message: " viewing one user",
            data: user
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: " cannot view all users",
            data: error
        })
    }
}




export const updateOneUserProfile = async (req: Request, res: Response) => {
    try {
        const {userID }= req.params
        const {userName, level, bio}= req.body
        
        const user: any = await userModel.findById(userID)

        if (user) {
            const mainUser = await userModel.findByIdAndUpdate(userID,{
                userName, level, bio
            }, 
            {new: true})
            return res.status(statusCode.CREATED).json({
                message: "you have successfully updated your Profile",
                data: mainUser
            })
        } else {
            return res.status(statusCode.BAD_REQUEST).json({
                message: "unable to update user Name",
            })
        }
    } catch (error: any) {
return res.status(statusCode.BAD_REQUEST).json({
    message: "Error updating user",
    data: error.message
})
    }
}