import { createUser } from "../models/authModel.js";
import { findUserByEmail, getUserByid } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";

export const register = asyncHandler(async (req, res) => {
  console.log(req.validateData);
  try {
      const { username, email, password } = req.validateData;
      console.log("before findUser");
    const existedUser = await findUserByEmail(email);
    console.log("after findUser", existedUser);
    if (existedUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    const newUser = await createUser(username, email, hashedPassword, "{user}");
    console.log("newUser", newUser);
    if (!newUser) {
      return res.status(400).json({ message: "Failed to create user" });
    }
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "interal server error , in register" });
  }
});
// login logic
export const login = asyncHandler( async (req, res) => {
  const { email, password } = req.validateData;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const isExistedUser = await findUserByEmail(email);
    if (!isExistedUser) {
      return res
        .status(400)
        .json({ message: "User not registered, please register first" });
    }
    const isMatch = await bcrypt.compare(
      password,
      isExistedUser.hashed_password,
    );
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    return res
      .status(200)
      .json({
        message: "Logged in successfully",
        user: {
          id: isExistedUser.id,
          username: isExistedUser.username,
          email: isExistedUser.email,
          role: isExistedUser.role,
        },
      });
  } catch (error) {
    return res.status(500).json({ message: "interal server error , in login" });
  }
});
// logout logic
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  try {
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    const decoded = verifyRefreshToken(token);
    await saveteRefreshToken(decoded.userId, null);
    res.clearCookie("ACCESS_TOKEN_SECRET");
    res.clearCookie("REFRESH_TOKEN_SECRET");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "interal server error , in logout" });
  }
});
// current user
export const currentUser = asyncHandler(async(req, res) => {
  const userId = req.user.id;
  
  const me = await getUserByid(userId);
  if (!me)
    return res.status(404).json({message: "User Not Found"})
  res.status(200).json({message: "User Fetched succssfuly", me})
})
