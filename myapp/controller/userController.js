// controllers/userController.js

const { where, Op, Model } = require("sequelize");
const {getUserModel,getPostModel} = require("../server");


// Create a new user
const createUser = async (req, res) => {
  try {
    const User = getUserModel()
    const { name, age } = req.body;
    const user = await User.create({ name, age });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    
    const {name,age} = req.query
    const filter = {};
    if (name) {
        filter.name = { [Op.like]: `%${name}%` }; 
      }
    if (age) filter.age = age;
    const User = getUserModel()
    const Post = getPostModel()
    const users = await User.findAll({where:filter, include: [{ model: Post }],});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error:error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const User = getUserModel()
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user", error });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const User = getUserModel()
    const { name, age } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.age = age || user.age;
    user.class = userClass || user.class;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const User = getUserModel()
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
