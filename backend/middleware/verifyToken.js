import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  // Check both cookie and Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("Token received:", token ? "Yes" : "No"); // Debug log

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Not Authenticated." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const verifyTokenAndAuthorization = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userId === req.params.id || req.userRole === "admin") {
      next();
    } else {
      res.status(403).json({ message: "You are not allowed to do that!" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userRole === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Only admins can do that!" });
    }
  });
};

export const verifyEditor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userRole === "editor" || req.userRole === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Only editors can do that!" });
    }
  });
};
