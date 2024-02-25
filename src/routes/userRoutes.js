const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUser = require("../middlewares/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", authenticateUser, userController.getCurrentUser);

module.exports = router;
