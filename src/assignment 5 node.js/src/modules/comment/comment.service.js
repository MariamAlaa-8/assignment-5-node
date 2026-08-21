import { Comment, User, Post, sequelize } from "../../DB/index.js";
import { Op } from "sequelize";
//c1
export const createBulkCommentsService = async (commentsData) => {
    const comments = await Comment.bulkCreate(commentsData);
    return comments;
};
//c2
export const updateCommentService = async (commentId, userId, content) => {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
        const error = new Error("Comment not found");
        error.cause = { status: 404 };
        throw error;
    }
    if (comment.userId !== userId) {
        const error = new Error("You are not authorized to update this comment");
        error.cause = { status: 403 };
        throw error}
    comment.content = content;
    await comment.save();
    return comment
};
//c3
export const findOrCreateCommentService = async (data) => {
    const { postId, userId, content } = data;

    const [comment, created] = await Comment.findOrCreate({
        where: {
            postId,
            userId,
            content
        },
        defaults: {
            postId,
            userId,
            content
        }
    })
    return { comment, created };
};
//c4
export const searchCommentsService = async (word) => {
    const comments = await Comment.findAll({
        where: {
            content: {
                [Op.like]: `%${word}%`
            }
        }
    });
    return { comments, count: comments.length };
};

//c5
export const getRecentCommentsService = async (postId) => {
    const comments = await Comment.findAll({
        where: { postId },
        order: [["createdAt", "DESC"]],
        limit: 3
    });
    return comments;
};
//c6

export const getCommentWithDetailsService = async (id) => {
    const comment = await Comment.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ["id", "name", "email"]
            },
            {
                model: Post,
                attributes: ["id", "title", "content"]
            }
        ]
    });

    if (!comment) {
        const error = new Error("no Comment  found");
        error.cause = { status: 404 };
        throw error;}
    return comment;
};