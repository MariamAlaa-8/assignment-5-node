import sequelize from "../../database.js"
import User from "./user.model.js"
import Post from "./post.model.js"
import Comment from "./comment.model.js"
import "./associations.js"
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(" Database connected successfully");
        
        await sequelize.sync({ alter: true });
        console.log(" Tables synced successfully");
    } catch (error) {
        console.error(" Database connection error:", error);
        process.exit(1); }}
export {
    sequelize,
    User,
    Post,
    Comment,
    connectDB
}
