const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Helper to create JWT token
const createToken = (user, rememberMe) => {
  const expiresIn = rememberMe ? '7d' : '1h';
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    const token = createToken(user, true); // Default to longer expiry on signup
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ error: "Signup failed", message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  console.log("Login body:", req.body);
  const { email, password, remember } = req.body;
   if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user || !user.password)
    return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ error: "Invalid credentials" });

  // JWT expiry based on rememberMe flag
  const expiry = remember ? "7d" : "1d";
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: expiry }
  );

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod only
    sameSite: "strict",
    maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 7 days or 1 day
  });

  res.json({
    message: "Login successful",
    user: { username: user.username, role: user.role },
    token,
  });
};

// Logout - Clear cookie
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Email not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendEmail(email, "Password Reset", `Click here to reset your password: ${link}`);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: "Error sending reset email", message: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: "Token verification failed" });
  }
};

