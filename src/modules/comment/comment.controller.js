import { Router } from "express";
import { successResponse } from "../../common/utils/success.response.js";
import {createBulkCommentsService,updateCommentService,findOrCreateCommentService,searchCommentsService,getRecentCommentsService,getCommentWithDetailsService} from "./comment.service.js";

const router = Router();
//C1
router.post("/", async (req, res, next) => {
    try {
        const comments = await createBulkCommentsService(req.body);
        return successResponse(res, "comments created ", comments, 201);
    } catch (error) {
        next(error);
    }
});
//C2:
router.patch("/:commentId", async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;
        const comment = await updateCommentService(commentId, userId, content);
        return successResponse(res, "comment updated ", comment, 200);
    } catch (error) {
        next(error);
    }
});
//C3
router.post("/find-or-create", async (req, res, next) => {
    try {
        const result = await findOrCreateCommentService(req.body);
        const message = result.created ? "Comment created" : "Comment found";
        return successResponse(res, message, result, 200);
    } catch (error) {
        next(error);
    }
});

//C4
router.get("/search", async (req, res, next) => {
    try {
        const { word } = req.query;
        const result = await searchCommentsService(word);
        
        
        if (result.count === 0) {
            return successResponse(res, "no comments found", result, 404);
        }
        
        return successResponse(res, "comments found", result, 200);
    } catch (error) {
        next(error);
    }
});
//C5

router.get("/newest/:postId", async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await getRecentCommentsService(postId);
        
      
        if (comments.length === 0) {
            return successResponse(res, "no comments found ", comments, 404);
        }
        
        return successResponse(res, " comments", comments, 200);
    } catch (error) {
        next(error);
    }
});
//C6
router.get("/details/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await getCommentWithDetailsService(id);
        return successResponse(res, "comment found", comment, 200);
    } catch (error) {
        next(error);
    }
});
export default router;