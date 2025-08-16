import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  try {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    console.log("✅ Token generated for user:", user._id); // log token generation

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict", // can change to "none" if frontend is on a different domain
        secure: process.env.NODE_ENV === "production", // true only on HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message,
        user,
        token, // optional: log token in response for debugging
      });
  } catch (err) {
    console.error("❌ Token generation error:", err.message);
    return res.status(500).json({ success: false, message: "Token generation failed" });
  }
};
