import {
  getUserByid,
  getAllUsers,
  findUserByEmail,
  updateUserById,
  deleteUserById,
} from "../models/userModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
// Get user by ID
export const getUserByIdController = asyncHandler(async (req, res) => {
  const userId = req.params.userid || req.params.id;
  try {
    const user = await getUserByid(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
});
// Get all users
export const getAllUsersController = asyncHandler(async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users.length === 0) {
      return res.status(200).json({ message: "No users yet", users: [] });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});
// find user by email
export const findUserByEmailController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user by email",
      error: error.message,
    });
  }
});
// update user by id
export const updateUserByIdController = asyncHandler(async (req, res) => {
  const userId = req.params.userid;
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserById(userId, name, email);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});
// delete user by id
export const deleteUserByIdController = asyncHandler(async (req, res) => {
  const id = req.params.userid || req.params.id;
  await deleteUserById(id);
  return res.status(200).json({ message: "User deleted successfully" });
});
