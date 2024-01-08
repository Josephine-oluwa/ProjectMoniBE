import express, {Application, Request, Response} from "express"
import cors from "cors"
import user from "./Router/userRouter"
import { statusCode } from "./utils/statusCode"



export const mainApp = (app: Application) => {
    app.use(express())
    app.use(cors())
    app.use("/", user)

    app.get("/", (req:Request, res:Response) => {
        try {
            return res.status(statusCode.OK).json({
                message: "found the API"
            })
        } catch (error) {
           return res.status(statusCode.BAD_REQUEST).json({
            message:"cannot find the APi",
            
           }) 
        }
    })
}