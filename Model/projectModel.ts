import mongoose from "mongoose"

interface iProject {
    projectUrl: string
    gitHubUrl: string
    projectTitle: string
    level: string
    motivation: string
    project: string

    avatar: string
    avatarID: string

    comments: Array<string>
    user: {}
}

interface iProjectData extends iProject, mongoose.Document {}

const ProjectModel = new mongoose.Schema<iProjectData>(
    {
       projectUrl : {
        type: String,
       },
       project: {
        type: String
       },
       gitHubUrl : {
        type: String
       },
       projectTitle: {
        type: String,
       },
       level: {
        type: String,
       },
       motivation: {
        type: String
       },
       avatar: {
        type: String
       },
      avatarID: {
        type: String
      },
      comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "comments",
        },
      ],
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
      }
    },
    {timestamps : true}
)

export default mongoose.model<iProjectData>("projects", ProjectModel)