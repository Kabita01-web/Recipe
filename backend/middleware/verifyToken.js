import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Not Authenticated." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.userId = payload.id;
    req.userRole = payload.role; // ADD THIS
    next();
  });
};

export const verifyTokenAndAuthorization = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userId === req.params.id) {
      next();
    } else {
      res.status(403).json({ message: "You are not allowed to do that!" });
    }
  });
};

// ADD THESE 👇

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
