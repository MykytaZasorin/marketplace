import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      email: normalizedEmail,
      password: hashed,
      role: "user",
    });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.lockUntil && user.lockUntil > Date.now()) {
      const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res
        .status(403)
        .json({ error: `Account locked. Try in ${minutesLeft} minutes.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.loginAttempts++;

      if (user.loginAttempts >= 3) {
        user.lockUntil = Date.now() + 30 * 60000;
        user.loginAttempts = 0;
      }

      await user.save();
      return res.status(400).json({ error: "Invalid email or password" });
    }

    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Користувач не знайдений" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetToken = hashed;
    user.hashed = Date.now() + 30 * 60 * 1000;

    await user.save();

    const resetUrl = `http://localhost:5173/reset/${resetToken}`;

    res.json({ message: "Лист відправлено", resetUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/reset/:token", async (req, res) => {
  const hashed = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetToken: hashed,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: "Токен недійсний" });

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();
    res.json({ message: "Пароль оновлено" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
