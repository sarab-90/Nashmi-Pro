import { getAllUsersController, getUserByIdController, findUserByEmailController, deleteUserByIdController, updateUser, changePasswordController } from '../controllers/user.Controller.js'
import { managerOnly } from '../middleware/managerOnly.Middleware.js';
import { protect } from "../middleware/protect.Middleware.js"

import express from 'express'

const router = express.Router();

router.get("/user/:id", protect, getUserByIdController)
router.get("/users", protect, managerOnly, getAllUsersController)
router.post("/user/email", protect, findUserByEmailController)
router.delete("/user/delete/:id", protect, deleteUserByIdController)
router.put('/user/update-info', protect, updateUser)
router.put('/user/change-password', protect, changePasswordController)
export default router