const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/errorHelpers");

// Controller function to register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return handleError(res, 400, "Username already exists");
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

// Controller function to login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return handleError(res, 401, "Invalid username or password");
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return handleError(res, 401, "Invalid username or password");
    }
    // Create and send a JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    // Fetch the current user from the database based on the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Return user information
    res.status(200).json(user);
  } catch (err) {
    handleError(res, 500, err.message);
  }
};
