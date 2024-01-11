import mongoose from "mongoose"
import userModel from "../Model/userModel"
import projectModel from "../Model/projectModel"
import commentModel from "../Model/commentModel";
import {statusCode} from "../utils/statusCode"
import {Request, Response} from "express"
import replyModel from "../Model/replyModel";



export const createComment = async (req: any, res: Response) => {
    try {
       const {userID, projectID} = req.params;

       const {title} = req.body;

       const user = await userModel.findById(userID)

       const project = await projectModel.findById(projectID)

       if (user) {
        const comment: any = await commentModel.create({
            title, userID: user._id, user
        })
        project?.comments.push(new mongoose.Types.ObjectId(comment._id!));
        project.save()

        return res.status(statusCode.CREATED).json({
            message : "comment Created",
            data: "project.comments"
        })
       } else {
        return res.status(statusCode.BAD_REQUEST).json({
            message : "user does not exist",
           
        })
       }
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message : "Error",
           
        })
    }
}



export const readComments = async (req: Request, res: Response) => {
    try {
        const {projectID} = req.params;

        const projects: any = await projectModel.findById(projectID).populate({
            path: "comments",
            options: {
                sort: {
                    createdAt: -1
                }
            }
        })

        return res.status(statusCode.CREATED).json({
            message: "project comments viewed",
            data: projects.comments
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error",
           
        })
    }
}

export const createCommentReply = async (req: any, res: Response ) => {
    try {
        const {userID, commentID} = req.params 
        const title = req.body 

        const user = await userModel.findById(userID)
        const project = await commentModel.findById(commentID)

        if (user) {
            const comment = await replyModel.create({
                title, userID: user._id, user
            })

            project?.reply.push(mongoose.Types.ObjectId(comment._id!))
            project.save

            return res.status(statusCode.CREATED).json({
                message: "project created"
            })
        } else {
            return res.status(statusCode.BAD_REQUEST).json({
                message: "unable to process request"
            })
        }
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error"
        })
    }
}


export const readCommentReply = async (req: any, res: Response) => {
    try {
        const {commentID} = req.params

        const project = await commentModel.findById(commentID).populate({
            path: "reply", 
            options: {
                sort: {
                    createdAt : -1
                }
            }
        })
        return res.status(statusCode.CREATED).json({
            message: "viewed successfully",
            data: project
        })

    } catch (error) {
       return res.status(statusCode.BAD_REQUEST)({
        message: "created"
       })
    
    }
}