import express, { Application } from "express"
import cors from "cors"
import { connectDB } from "./utils/DataBase"
import { mainApp } from "./mainApp";

const port: number = 3344;
const app: Application = express()

app.use(express.json())
app.use(cors())

mainApp(app)

const server = app.listen (port, () => {
    console.log()
    connectDB().then(() => {
        console.log("server is ready!!!")
    })
})


process.on("uncaughtException", (error: any)=> {
    console.log("uncaughtException", error)

 
        process.exit(1)

})


process.on ("unhandledRejection", (reason: any) => {
    console.log("unhandledRejection", reason)

    server.close(() => {
        process.exit(1)
    })
} )
