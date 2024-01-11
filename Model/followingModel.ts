import mongoose from "mongoose"

interface iFollowing {
    userID: string,
    user: {}
}

interface iFollowingData extends iFollowing, mongoose.Document {}

const followModel = new mongoose.Schema<iFollowingData>(
    {
        userID : {
            type: String
        },
        user: {
            type: mongoose.Types.ObjectId, 
            ref: "users"
        }
    },
    {timestamps: true}
)

export default mongoose.model<iFollowingData>("followers", followModel)