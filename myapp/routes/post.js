// routes/postRoutes.js
const express = require("express");
const { createPost, getPosts, getDetailPosts, updatePosts } = require("../controller/postController");

const router = express.Router();

router.get("/posts", getPosts);     // Get all posts
router.post("/posts", createPost);  // Create a new post for a user
router.get("/posts/:id", getDetailPosts);
router.put("/posts/:id", updatePosts);
module.exports = router;
