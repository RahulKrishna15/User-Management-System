const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Login page
router.get("/login", userController.getLoginPage);

// User dashboard
router.get("/dashboard", authMiddleware, userController.getDashboard);

// Login
router.post("/login", userController.login);

// Get current user info
router.get("/info", authMiddleware, userController.getUserInfo);

// Logout
router.get("/logout", userController.logout);

module.exports = router;
