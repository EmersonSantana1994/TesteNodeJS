import { Router } from "express";
import { TesteController } from "../controller/TesteController";

const router = Router();
const testeController = new TesteController();

router.post("/testes", testeController.criarTeste);
router.get("/testes/exportar", testeController.exportarParaCSV);

export default router;
