import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      userid: decoded.id || decoded.userid,
      role: decoded.role,
    };
    next();
  } catch (error) {
    console.error("JWT Protect Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
