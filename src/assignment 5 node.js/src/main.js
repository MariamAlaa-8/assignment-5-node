
import express from "express"
import { connectDB } from "./DB/index.js"
import { authenticationController, usersController, postController, commentController } from "./modules/index.js"
import { globalErrorHandling } from "./middleware/index.js"
import { PORT } from "./config.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API " })});
app.use("/users", authenticationController)
app.use("/users", usersController)
app.use("/posts", postController)
app.use("/comments", commentController)
app.use(globalErrorHandling)
app.listen(PORT, async () => {
    console.log(` Server running on port ${PORT}`);
    await connectDB();
})