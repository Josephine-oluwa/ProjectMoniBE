import express, {Application, Request, Response} from "express"
import cors from "cors"


export const mainApp = (app: Application) => {
    app.use(express())
    app.use(cors())

    app.get("/", (req:Request, res:Response) => {
        try {
            return res.status(201).json({
                message: "found the API"
            })
        } catch (error) {
           return res.status(404).json({
            message:"cannot find the APi",
            data: error.message
           }) 
        }
    })
}