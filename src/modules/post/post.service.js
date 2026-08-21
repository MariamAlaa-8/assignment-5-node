import { Post, User, Comment, sequelize } from "../../DB/index.js";
//b1
export const createPostService = async (data) => {
    const post = Post.build(data);
    await post.save();
    return post;
};
//b2
export const deletePostService = async (postId, userId) => {
    const post = await Post.findByPk(postId);

    if (!post) {
        const error = new Error("Post not found");
        error.cause = { status: 404 };
        throw error;}
    if (post.userId !== userId) {
        const error = new Error("You are not authorized this post")
        error.cause = { status: 403 }
        throw error;}
    await post.destroy();
    return post;
};
//b3
export const getPostsWithDetailsService = async () => {
    const posts = await Post.findAll({
        attributes: ["id", "title"],
        include: [
            {
                model: User,
                attributes: ["id", "name"]
            },
            {
                model: Comment,
                attributes: ["id", "content"]
            }
        ]
    });
    return posts
};

//b4
export const getPostsCommentCountService = async () => {
    const posts = await Post.findAll({
        attributes: [
            "id",
            "title",
            [sequelize.fn("COUNT", sequelize.col("Comments.id")), "commentCount"]
        ],
        include: [
            {
                model: Comment,
                attributes: []
            }
        ],
        group: ["Post.id", "Post.title"]
    });
    return posts;
};