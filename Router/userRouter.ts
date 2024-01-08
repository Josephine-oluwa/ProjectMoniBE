import Router from "express"
import { createUser, readAllUser, readOneUser, readUserByLevel, updateOneUserProfile, verifyUser } from "../Controller/userController"

const router = Router()

router.route("/create-user").post(createUser)
router.route("/verify-user/:userID").get(verifyUser)
router.route("/read-all").get(readAllUser)
router.route("/read-level").get(readUserByLevel)
router.route("/read-one/:userID").get(readOneUser)
router.route("/update-one/:userID").patch(updateOneUserProfile)

export default router