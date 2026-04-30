import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// 🔹 Aqui você conecta as rotas
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API FortSeg rodando 🚀");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

// verificar pelo GET http://localhost:3000/users