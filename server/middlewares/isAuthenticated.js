import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("🔑 Received token:", token);

    if (!token) {
      console.warn("⚠️ No token found in request cookies");
      return res.status(401).json({ message: "User not authenticated", success: false });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log("🛠 Token decoded:", decode);

    if (!decode) {
      console.warn("⚠️ Token could not be decoded");
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.id = decode.userId;
    console.log("✅ User authenticated, userId:", req.id);
    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    return res.status(401).json({ message: "Authentication failed", success: false });
  }
};

export default isAuthenticated;
