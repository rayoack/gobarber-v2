import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas de criação de usuário e login
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/* Middleware de autenticação, rotas abaixo delas só poderam ser acessadas com o token de usuário */
routes.use(authMiddleware);

// Rota de alteração de usuário
routes.put('/users', UserController.update);

// Rota de upload de imagem
routes.post('/files', upload.single('file'), FileController.store);

export default routes;