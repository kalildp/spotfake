import Express from 'express';
import { User, criarTabelas } from './db.js'
import cors from 'cors'
import { rotas_autenticacao } from './rotas/rotas_autenticacao.js';
import { rotas_usuario } from './rotas/rotas_usuario.js';

const app = Express()
app.use(Express.json())
app.use(cors())
//criarTabelas() 

app.use('/autenticacao', rotas_autenticacao);
app.use('/usuarios', rotas_usuario)


app.listen(8000)