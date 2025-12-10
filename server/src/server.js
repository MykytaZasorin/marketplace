import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import usersRouter from "./routes/users.js";
// import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/users", usersRouter);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/client/src")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/src/index.html"));
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
