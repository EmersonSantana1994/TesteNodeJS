import { Request, Response } from "express";
import { Teste } from "../models/Model";
import { getRepository } from "typeorm";
import { createObjectCsvWriter } from "csv-writer";

export class TesteController {
  async criarTeste(req: Request, res: Response) {
    const { publicoAlvo, quantidadeEstrelas, email } = req.body;

    if (!publicoAlvo || quantidadeEstrelas === undefined || !email) {
      return res.status(400).json({ erro: "Dados inválidos" });
    }

    const testeRepo = getRepository(Teste);
    const teste = testeRepo.create({ publicoAlvo, quantidadeEstrelas, email });
    await testeRepo.save(teste);

    return res.status(201).json(teste);
  }

  async exportarParaCSV(req: Request, res: Response) {
    const { publicoAlvo, ordem = 'asc' } = req.query;

    const testeRepo = getRepository(Teste);
    const testes = await testeRepo.find({
      where: { publicoAlvo },
      order: { quantidadeEstrelas: ordem === 'asc' ? 'ASC' : 'DESC' },
    });

    if (testes.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum teste encontrado" });
    }

    const csvTeste = createObjectCsvWriter({
      path: 'testes.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'publicoAlvo', title: 'Público-Alvo' },
        { id: 'quantidadeEstrelas', title: 'Quantidade de Estrelas' },
        { id: 'email', title: 'E-mail' },
        { id: 'dataCriacao', title: 'Data de Criação' },
      ],
    });

    await csvTeste.writeRecords(testes);

    res.download('testes.csv', 'testes.csv', (erro) => {
      if (erro) {
        console.error("Falha no download do arquivo:", erro);
      }
    });
  }
}
