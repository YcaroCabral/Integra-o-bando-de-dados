import type { NextApiRequest, NextApiResponse } from "next";
import {conectarMongoDB} from '../../middlewares/middlewaresDb'
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg'
 
const edpointLogin = (
  req: NextApiRequest,
  res: NextApiResponse<RespostaPadraoMsg>
) => {
  if (req.method === 'POST') {
    const { login, senha } = req.body;

    if (login === 'admin@admin.com' &&
      senha === 'admin') {
      return res.status(200).json({ msg: ' Usurario autenticado com sucesso' });
    }
    return res.status(400).json({ erro: 'Usuario ou senha não encontrado' });
  }
  return res.status(405).json({ erro: 'Metodo invalido' });


}

export default conectarMongoDB(edpointLogin);
