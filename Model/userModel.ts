import mongoose from "mongoose"

interface iUser {
    email: string,
    password: string,
    userName: string,
    verify: boolean;
    token: string;
    avatar: string;
    avatarID: string;

    bio: string;
    level: string;

    
}

interface iUserData extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema<iUserData>(
{
    email: {
        type: String,
        unique: true,
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    verify: {
        type: Boolean
    },
    
    token: {
        type: String
    },
    avatar : {
        type: String
    },
    avatarID: {
        type: String
    },
    bio: {
        type: String
    },
    level: {
        type: String
    }
},
{timestamps: true}
);

export default mongoose.model<iUserData>("users", userModel)