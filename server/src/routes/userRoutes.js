import express from "express";
import {protect} from "../middleware/protectMiddleware.js";
import {adminOnly} from "../middleware/adminOnlyMiddleware.js"
import {
    getUserByIdController,
    getAllUsersController,
    findUserByEmailController,
    updateUserByIdController,
    deleteUserByIdController
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", protect, getUserByIdController);

router.get("/all", protect, adminOnly, getAllUsersController);

router.put("/update/:id", protect, adminOnly, updateUserByIdController);

router.post("/emil", protect, findUserByEmailController);

router.delete("/delete/:id", protect, adminOnly, deleteUserByIdController);

export default router;