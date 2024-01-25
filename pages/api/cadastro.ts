import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type { CadastroRequisicao } from '../../types/CadastroRequisicao';
import { UsuarioModel } from '../../models/UsuarioModels';
import  md5 from 'md5';
import {conectarMongoDB} from '../../middlewares/middlewaresDb'

const edpointCadastro =
   async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

        if (req.method === 'POST') {
            const usuario = req.body as CadastroRequisicao;

            if (!usuario.name || usuario.name.length < 2) {
                return res.status(400).json({ erro: 'Nome Invalido' });
            }

            // Regex simples para validar o formato do e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!usuario.email || !emailRegex.test(usuario.email)) {
                return res.status(400).json({ erro: 'E-mail Inválido' });
            }

            if(!usuario.password || usuario.password.length<4){
                return res.status(400).json({ erro: 'Senha Inválida' });
            }

            //Salvar no banco de dado
            const usuarioASerSalvo = {
                name : usuario.name,
                email : usuario.email,
                password : md5(usuario.password)

            }

            await UsuarioModel.create(usuarioASerSalvo);

            return res.status(200).json({ msg : 'Usuario Cadastrado'});

        }
        return res.status(405).json({ erro: 'Metodo informado não é valido' });

    }

    export default conectarMongoDB (edpointCadastro);


