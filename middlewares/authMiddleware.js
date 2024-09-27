const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({ where: { id: verified.id } });
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authMiddleware;
