import express from "express";

import authRoutes from "../src/auth/routes/authRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
