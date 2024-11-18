import Express from 'express';
import { nova_senha, pegar_usuario, salvar_foto } from '../controlador/controlador_usuario.js';

const rotas_usuario = Express.Router()

rotas_usuario.get('/:email', pegar_usuario)
rotas_usuario.post('/:email/salvar_foto', salvar_foto)
rotas_usuario.post('/:email/nova_senha', nova_senha)

export {rotas_usuario}
