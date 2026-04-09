import {
  getUserById,
  findUserByEmail,
  getAllUsers,
  updateUserById,
  deleteUserById,
  changePassword,
} from "../models/userModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
import bcrypt from "bcryptjs";

// Get user by ID
export const getUserByIdController = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found successfully", user });
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
    return res.status(200).json({ message: "Users found successfully", users });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error in get all users",
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
    return res.status(200).json({ message: "User found successfully", user });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error ",
      error: error.message,
    });
  }
});
// update user by id
export const updateUserByIdController = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { name, email } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    const user = await getUserById(userId);
    let updateFields = {};
    if (name && name !== user.name) {
      updateFields.name = name;
      updateFields.email = user.email;
    }
    if (email && email !== user.email) {
      updateFields.email = email;
      updateFields.name = user.name;
    }
    if (Object.keys(updateFields).length === 0) {
      return res.status(200).json({ message: "No changes detected" });
    }
    await updateUserById(userId, updateFields);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});
// delete user by id
export const deleteUserByIdController = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  try {
    await deleteUserById(userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
});
// change password
export const changePasswordController = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const user = await getUserById(userId);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.hashed_password);
    // Check if new password and confirm new password match
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ 
        message: "New password and confirm new password do not match" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the password in the database
    const updated = await changePassword(userId, hashedPassword);
    return res.status(200).json({ message: "Password changed successfully", user: updated });
  } catch (error) {
    return res.status(500).json({
      message: "Error changing password",
      error: error.message,
    });
  }
});
