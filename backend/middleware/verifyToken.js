const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Read Authorization header
  const authHeader = req.header("Authorization");

  console.log("Authorization Header:", authHeader);
  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  try {
    console.log("Token:", token);
    // Verify JWT using the same secret used while creating it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded user information
    req.user = decoded;

    // Continue to the protected route
    next();
  } catch (err) {
  
  console.log("JWT Verify Error:", err.message);

  return res.status(401).json({
    message: "Invalid Token",
  });

  }
};

module.exports = verifyToken;