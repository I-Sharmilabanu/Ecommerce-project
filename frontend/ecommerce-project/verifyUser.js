const admin = require("./firebaseAdmin");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded; // uid, email
    next();
  } catch (err) {
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = verifyUser;
