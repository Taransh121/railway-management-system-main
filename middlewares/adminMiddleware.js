const adminMiddleware = (req, res, next) => {
  const apiKey = req.header("API-Key");
  if (apiKey !== process.env.ADMIN_API_KEY)
    return res.status(401).send("Access Denied");
  next();
};

module.exports = adminMiddleware;
