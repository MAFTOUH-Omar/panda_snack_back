const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (roles) => async (req, res, next) => {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer";

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.TOKEN_KEY
    );

    // Set CORS headers to allow requests from any origin
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Other CORS headers (optional)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Vérifier si l'utilisateur a le rôle requis
    if (roles && roles.length > 0 && !roles.includes(decoded.role)) {
      return res.status(403).send("Unauthorized role");
    }

    req.user = decoded;

    // Redirection en fonction du rôle
    if (decoded.role === "admin") {
        return res.redirect("/admin/dashboard");
    } else if (decoded.role === "user") {
        return res.redirect("/user/dashboard");
    } else if (decoded.role === "delivery") {
        return res.redirect("/delivery/dashboard");
    }

    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;