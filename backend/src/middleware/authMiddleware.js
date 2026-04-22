import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401);
    return next(new Error("Not authorized"));
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(401);
      return next(new Error("User not found"));
    }
    next();
  } catch (error) {
    res.status(401);
    next(new Error("Token invalid or expired"));
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403);
    return next(new Error("Forbidden"));
  }
  next();
};
