const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");

exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "user", "login.html"));
};

exports.getDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "user", "dashboard.html"));
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Set session data
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userRole = user.role;

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserInfo = (req, res) => {
  if (req.session && req.session.userId) {
    return res.status(200).json({
      id: req.session.userId,
      name: req.session.userName,
      email: req.session.userEmail,
      role: req.session.userRole,
    });
  }

  res.status(401).json({ message: "Not authenticated" });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out successfully" });
};
