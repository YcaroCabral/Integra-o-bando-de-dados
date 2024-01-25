import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from 'mongoose';

export const conectarMongoDB = (handler: NextApiHandler) =>
  async function (req: NextApiRequest, res: NextApiResponse) {
    const { DB_CONEXAO_STRING } = process.env;

    if (!DB_CONEXAO_STRING) {
      return res.status(500).json({ erro: 'ENV de configuração do banco não informado' });
    }

    try {
      await mongoose.connect(DB_CONEXAO_STRING);

      mongoose.connection.on('connected', () => console.log('Banco de dados Conectado'));
      mongoose.connection.on('error', error => console.log(`Erro ao conectar no banco : ${error}`));

      if (mongoose.connections[0].readyState) {
        return handler(req, res);
      }
    } catch (error) {
      console.error(`Erro ao conectar no banco : ${error}`);
      return res.status(500).json({ erro: 'Erro ao conectar no banco de dados' });
    }

    return handler (req, res);
  };
