import request from "supertest";
import app from "../app";

describe("API de Teste", () => {
  it("criar um teste", async () => {
    const response = await request(app)
      .post("/testes")
      .send({
        publicoAlvo: "Geeks",
        quantidadeEstrelas: 5,
        email: "teste@example.com"
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
