const adminMiddleware = (req, res, next) => {
  if (req.session && req.session.userRole === 'admin') {
    return next();
  }
  
  return res.status(403).json({ message: 'Admin access required' });
};

module.exports = adminMiddleware;