import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./database";
import testeRoutes from "./routes/index";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api", testeRoutes);

app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
