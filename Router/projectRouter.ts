import {Router} from "express"
import { createProject, deleteProject, readAllProject, readOneProject, readProject } from "../Controller/projectController"

const router = Router()

router.route("/create-project/:userID").post(createProject)
router.route("/deleteProject/:userID/:projectID").delete(deleteProject)
router.route("/read-projects/:userID").get(readProject)
router.route("/read-one-project/:projectID").get(readOneProject)
router.route("/read-all-project").get(readAllProject)


export default router