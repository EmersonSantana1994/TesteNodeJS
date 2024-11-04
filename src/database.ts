import { createConnection } from "typeorm";

export const connectDB = async () => {
  try {
    await createConnection();
    console.log("Banco de dados conectado!");
  } catch (error) {
    console.error("Falha na conexão com o banco de dados", error);
  }
};
