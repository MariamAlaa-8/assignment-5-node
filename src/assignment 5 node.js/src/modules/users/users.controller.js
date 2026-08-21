import { Router } from "express";
import { successResponse } from "../../common/utils/success.response.js";
import {upsertUserService,getUserByEmailService,getUserByIdService} from "./users.service.js";
const router = Router();
//a2
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await upsertUserService(id, req.body);
        
     
        const message = result.isNew ? "User created successfully" : "User updated successfully";
        
        const { password, ...userWithoutPassword } = result.user.toJSON();
        
        return successResponse(res, message, userWithoutPassword, 200);
    } catch (error) {
        next(error);
    }
});

//a3
router.get("/by-email", async (req, res, next) => {
    try {
        const { email } = req.query;
        const user = await getUserByEmailService(email);
        return successResponse(res, "User found", user, 200);
    } catch (error) {
        next(error);
    }
});
//a4
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);
        return successResponse(res, "User found", user, 200);
    } catch (error) {
        next(error);
    }
});
export default router;