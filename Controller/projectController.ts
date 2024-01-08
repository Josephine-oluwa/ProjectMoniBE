import {Request, Response} from "express"
import mongoose from "mongoose"
import userModel from "../Model/userModel"
import { streamUpload } from "../utils/stream"
import {statusCode } from "../utils/statusCode"
import projectModel from "../Model/projectModel"

export const createProject = async (req: any, res: Response) => {
try {
    const {userID} = req.params
    const { ProjectTitle, projectUrl,  level,  motivation, gitHubUrl} = req.body

    const user: any = await userModel.findById(userID)

    const {secure_Url, public_id}: any = await streamUpload(req)

    if (user) {
        const project : any = await projectModel.create(
            {
                ProjectTitle, projectUrl, level, motivation, gitHubUrl,

                avatar: secure_Url,
                avatarID: public_id
            }
        )

        user?.project.push(new mongoose.Types.ObjectId(project._id));
        user.save()

        return res.status(statusCode.CREATED).json({
            message: "project is created now",
            data: project
        })
    } else {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "user does not exist"
        })
    }
} catch (error) {
   return res.status(statusCode.BAD_REQUEST).json({
    message: "Error"
   })
}
}



export const readProject = async(req: any, res: Response) => {
    try {
        const {userID} = req.params;

        const projects: any = projectModel.findById(userID).populate({
            path: "projects",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        })
        return res.status(statusCode.CREATED).json({
            message: "Here is all Projects",
            data: projects.projects,

        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "unable to view all projects",
            data: "Error",

        })
    }
}


export const deleteProject = async (req: any, res: Response) => {
    try {
        const {userID, projectID} = req.params

        const user: any = await projectModel.findById(userID);

        if (user) {
            const project: any = await projectModel.findByIdAndDelete(projectID)

           user?.projects.pull(new mongoose.Types.ObjectId(project._id!))

           user.save();
           return res.status(statusCode.CREATED).json({
            message: "project Deleted",
            data: project
           })
        } else {
            return res.status(statusCode.BAD_REQUEST).json({
                message: "project Deleted",
            })
        }

    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error"
        })
    }
}


export const readOneProject = async(req: any,res: Response) => {
    try {
        const {projectID} = req.params 

        const project = await projectModel.findById(projectID)

        return res.status(statusCode.OK).json({
            message: "project read",
            data: project
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error"
        })
    }
}

export const readAllProject = async(req: any,res: Response) => {
    try {
        const projects : any= await projectModel.find()

        return res.status(statusCode.CREATED).json({
            message: "projects read",
            data: projects
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error"
        })
    }
}