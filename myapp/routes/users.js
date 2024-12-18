// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userController");

// Route for creating a new user
router.post("/", createUser);

// Route for getting all users
router.get("/", getUsers);

// Route for getting a user by ID
router.get("/:id", getUserById);

// Route for updating a user by ID
router.put("/:id", updateUser);

// Route for deleting a user by ID
router.delete("/:id", deleteUser);

module.exports = router;
