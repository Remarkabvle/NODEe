import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users, validateUser } from "../models/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

class UsersController {
  async getProfile(req, res) {
    try {
      const user = await Users.findById(req.user._id);
      res.status(200).json({
        msg: "Profile fetched successfully",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }

  async registerUser(req, res) {
    try {
      const { error } = validateUser(req.body);
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "warning",
          payload: null,
        });
      }

      const { username, password } = req.body;

      const existingUser = await Users.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          msg: "User already exists",
          variant: "error",
          payload: null,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await Users.create({
        ...req.body,
        password: hashedPassword,
      });

      res.status(201).json({
        msg: "User registered successfully",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }

  async loginUser(req, res) {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid username or password",
        variant: "error",
        payload: null,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Invalid username or password",
        variant: "error",
        payload: null,
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Logged in successfully",
      variant: "success",
      payload: token,
    });
  }

  async getAllUsers(req, res) {
    try {
      const users = await Users.find().sort({ createdAt: -1 });
      res.status(200).json({
        msg: "Users fetched successfully",
        variant: "success",
        payload: users,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username } = req.body;
      const existingUser = await Users.findOne({ username });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({
          msg: "Username already exists",
          variant: "error",
          payload: null,
        });
      }
      req.body.password = existingUser.password;
      const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({
        msg: "User updated successfully",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new UsersController();
