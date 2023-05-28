import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPostByCat,
  getPostByUser,
  getPosts,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/category", getPostByCat)
router.get("/:id", getPost);
router.get("/listPost", getPostByUser);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
