const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
