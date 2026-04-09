import express from "express";
import {protect} from "../middleware/protectMiddleware.js";
import {adminOnly} from "../middleware/adminOnlyMiddleware.js"
import {
    getUserByIdController,
    findUserByEmailController,
    getAllUsersController,
    updateUserByIdController,
    deleteUserByIdController,
    changePasswordController
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all", protect, adminOnly, getAllUsersController);

router.get("/:userid", protect, getUserByIdController);

router.put("/update/:userid", protect, adminOnly, updateUserByIdController);

router.post("/email", protect, findUserByEmailController);

router.delete("/delete/:userid", protect, adminOnly, deleteUserByIdController);

router.put("/change-password", protect, changePasswordController);

export default router;