import { Blogs, validateBlog } from "../models/blogSchema.js";

class BlogsController {
  async get(req, res) {
    try {
      const blogs = await Blogs.find().populate({
        path: "userId",
        select: ["fname", "lname"],
      });
      if (!blogs.length) {
        return res.status(404).json({
          msg: "Blogs not found",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "Fetched all blogs",
        variant: "success",
        payload: blogs,
      });
    } catch {
      res.status(500).json({
        msg: "Internal server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async create(req, res) {
    try {
      const { error } = validateBlog(req.body);
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "warning",
          payload: null,
        });
      }
      const blog = await Blogs.create({ ...req.body, userId: req.user._id });
      res.status(201).json({
        msg: "Blog created successfully",
        variant: "success",
        payload: blog,
      });
    } catch {
      res.status(500).json({
        msg: "Internal server error",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new BlogsController();
