const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  res.status(201).send(user);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).send("Invalid Username or Password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid Username or Password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );
  res.header("Authorization", token).send({ token });
};

module.exports = {
  register,
  login,
};
