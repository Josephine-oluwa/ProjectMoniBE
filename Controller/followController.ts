import {Request, Response} from "express"
import userModel from "../Model/userModel"
import FollowModel from "../Model/FollowModel"
import mongoose from "mongoose"
import followingModel from "../Model/followingModel"
import {statusCode} from "../utils/statusCode"

export const createFollowMain = async (req: any, res: Response) => {
    try {
        const {userID, friendID} = req.params

        const user: any = await userModel.findById(userID)

        const friend :any = await userModel.findById(friendID)

        const createFollow: any = await FollowModel.create({
            userID: userID, user
        })

       const createFollowing: any = await followingModel.create({
        userID: userID, user
       })

        user.following.push(new mongoose.Types.ObjectId(createFollowing._id));

        friend.follower.push(new mongoose.Types.ObjectId(createFollow._id));

        friend.save();

        return res.status(statusCode.CREATED).json({
           message:  "successfully created following"
        })
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating following",
            data: error.message
        })
    }
}


export const createFollowing = async (req: any, res: Response) => {
    try {
       const {userID, friendID} = req.params;

       const friend: any = await userModel.findById(friendID).populate({
        path: "follower",
        options: {
            sort: {
                createdAt: -1
            }
        }
       })

       if (friend.follower.some((el: any) => el.userID === friendID)) {
        return res.status(statusCode.CREATED).json({
            message: "user found"
        })
       } else {
        createFollowMain(req,res)
       }
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Error creating following",
            data: error.message
        })
    }
}



export const createUnfollowing = async (req: any, res: Response) => {
    try {
       const {userID, friendID} = req.params 

       const user: any = await userModel.findById(userID);

       const friend: any = await userModel.findById(friendID)

       if (user && friend) {
        const friendData = await FollowModel.findByIdAndDelete({friendID}) 

        const userData = await FollowModel.findByIdAndDelete({userID})

        user.following.pull(new mongoose.Types.ObjectId(friendID));
        user.save();

        friend.follower.pull(new mongoose.Types.ObjectId(userID))
        friend.save()


       } 

       return res.status(status)


    } catch (error) {
        
    }
}

