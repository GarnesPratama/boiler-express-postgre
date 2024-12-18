// controllers/userController.js

const { where, Op, Model } = require("sequelize");
const {getUserModel,getPostModel} = require("../server");

const createPost = async (req, res) => {
    try {
      const User = getUserModel();
      const Post = getPostModel();
      
      const { userId, title, content } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
  
  
      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Create a new post associated with the user
      const newPost = await Post.create({ title, content, userId });
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post", error: error.message });
    }
  };
  
  // Get all posts with user information
  const getPosts = async (req, res) => {
    try {
      const Post = getPostModel();
      const User = getUserModel();
      const posts = await Post.findAll({
        include: [{ model: User }], // Include user related to the post
      });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ message: "Failed to retrieve posts", error: error.message });
    }
  };

  const getDetailPosts = async (req, res) => {
    try {
      const Post = getPostModel();
      const User = getUserModel();
      const { id } = req.params;
      const posts = await Post.findByPk(id,{
        include: [{ model: User }], // Include user related to the post
      });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ message: "Failed to retrieve posts", error: error.message });
    }
  };

  const updatePosts = async (req, res) => {
    try {
      const Post = getPostModel();
      const User = getUserModel();
      const { title, content } = req.body;
      const posts = await Post.findByPk(req.params.id,{
        include: [{ model: User }], // Include user related to the post
      });

      posts.title = title || posts.title;
      posts.content = content || posts.content;
    //   posts.class = postsClass || posts.class;
      await posts.save();

      
  
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ message: "Failed to retrieve posts", error: error.message });
    }
  };
  
  
  module.exports = {
    createPost,
    getPosts,
    getDetailPosts,
    updatePosts
  };
