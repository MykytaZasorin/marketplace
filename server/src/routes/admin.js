import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/users", verifyToken, requireAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.put("/block/:id", verifyToken, requireAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
  res.json({ message: "User blocked" });
});

router.put("/unblock/:id", verifyToken, requireAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: false });
  res.json({ message: "User unblocked" });
});

export default router;
