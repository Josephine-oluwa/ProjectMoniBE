import {Router} from "express"
import { createComment, createCommentReply, readCommentReply } from "../Controller/commentController"

const router = Router()

router.route("/create-comment/:userID/:projectID").post(createComment)
router.route("/read-comment/:projectID").get(createComment)
router.route("/create-reply/:userID, commentID").post(createCommentReply)
router.route("/read-reply/:commentID").get(readCommentReply)

export default router;