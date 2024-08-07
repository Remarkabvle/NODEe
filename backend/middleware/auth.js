import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      msg: "No token provided",
      variant: "error",
      payload: null,
    });
  }

  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        msg: "Invalid token",
        variant: "error",
        payload: null,
      });
    } else {
      req.user = decoded;
      next();
    }
  });
};
