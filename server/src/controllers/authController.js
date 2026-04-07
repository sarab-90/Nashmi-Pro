import jwt from "jsonwebtoken";
import { createUser } from "../models/authModel.js";
import {
  findUserByEmail,
  getUserByid,
  saveRefreshToken,
} from "../models/userModel.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";
// دالة التسجيل
export const register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existedUser = await findUserByEmail(email);
    if (existedUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(
      name,
      email,
      hashedPassword,
      role || "user",
    );
    if (!newUser) {
      return res.status(400).json({ message: "Failed to create user" });
    }
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in register" });
  }
});
// دالة تسجيل الدخول
export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      console.log("❌ المستخدم غير موجود");
      return res.status(400).json({ message: "المستخدم غير مسجل" });
    }
    const dbPassword = user.hashed_password;

    if (!dbPassword) {
      console.error(
        "❌ خطأ: لم يتم العثور على حقل كلمة المرور في بيانات المستخدم!",
      );
      return res.status(500).json({ message: "خطأ في بيانات قاعدة البيانات" });
    }

    const isMatch = await bcrypt.compare(password, dbPassword);
    if (!isMatch) {
      console.log("❌ كلمة المرور خاطئة");
      return res.status(400).json({ message: "بيانات غير صحيحة" });
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
      return res.status(500).json({ message: "خطأ في إعدادات السيرفر" });
    }

    const accessToken = jwt.sign(
      { id: user.userid, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: "false",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 دقيقة
    }); 
    return res.status(200).json({
      message: "تم تسجيل الدخول بنجاح",
      user: { id: user.userid, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ message: "خطأ داخلي", error: error.message });
  }
});
// دالة تسجيل الخروج
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(200).json({ message: "Logged out" });
  }
};
// المستخدم الحالي
export const currentUser = async (req, res) => {
  try {
    if (!req.user || !req.user.userid) {
      return res.status(200).json({
        success: true,
        user: null,
        message: "No active session",
      });
    }
    const user = await getUserByid(req.user.userid)
    if (!user) {
      return res.status(200).json({ success: true, user: null });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in getCurrentUser:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
