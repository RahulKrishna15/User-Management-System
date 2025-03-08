const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Check if user is logged in via session
  if (req.session && req.session.userId) {
    return next();
  }

  // Check if user is authenticated via token
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
