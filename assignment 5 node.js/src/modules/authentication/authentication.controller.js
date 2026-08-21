import { Router } from "express"
import { successResponse } from "../../common/utils/success.response.js"
import { signupService } from "./authentication.service.js"
const router = Router();
//a1
router.post("/signup", async (req, res, next) => {
    try {
        const user = await signupService(req.body);
        return successResponse(res, "User added successfully", user, 201);
    } catch (error) {
        next(error);
    }
});
export default router;