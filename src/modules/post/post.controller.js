import { Router } from "express";
import { successResponse } from "../../common/utils/success.response.js";
import {createPostService,deletePostService,getPostsWithDetailsService,getPostsCommentCountService} from "./post.service.js";

const router = Router();
//b1
router.post("/", async (req, res, next) => {
    try {
        const post = await createPostService(req.body);
        return successResponse(res, "Post created successfully", post, 201);
    } catch (error) {
        next(error);}});
//b2
router.delete("/:postid", async (req, res, next) => {
    try {
        const { postid } = req.params;
        const { userId } = req.body;
        const post = await deletePostService(postid, userId);
        return successResponse(res, "Post deleted ", post, 200);
    } catch (error) {
        next(error);
    }});
//b3
router.get("/details", async (req, res, next) => {
    try {
        const posts = await getPostsWithDetailsService();
        return successResponse(res, "posts  successfully", posts, 200);
    } catch (error) {
        next(error);}});
//b4
router.get("/comment-count", async (req, res, next) => {
    try {
        const posts = await getPostsCommentCountService();
        return successResponse(res, "Comment successfully", posts, 200);
    } catch (error) {
        next(error);}});

export default router;