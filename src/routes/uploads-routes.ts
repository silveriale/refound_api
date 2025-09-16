/****
 * @file uploads-routes.ts
 * @description Define as rotas relacionadas a upload de arquivos no sistema.
 */

import { Router } from "express";
import multer from "multer";
import uploadConfig from "@/configs/upload";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { UploadsController } from "@/controllers/uploads-controller";

/**
 * Instância de roteador Express para gerenciar as rotas de upload de arquivos.
 */
const uploadsRoutes = Router();

/**
 * Instância do controlador responsável por lidar com as operações de upload.
 */
const uploadsController = new UploadsController();

/**
 * Configuração do middleware Multer para manipulação de arquivos enviados.
 */
const upload = multer(uploadConfig.MULTER);

/**
 * Middleware aplicado a todas as rotas de upload para garantir
 * que apenas usuários com role "employee" tenham acesso.
 */
uploadsRoutes.use(verifyUserAuthorization(["employee"]));

/**
 * Rota POST "/" para upload de um único arquivo.
 * Utiliza Multer para processar o arquivo e chama o método `create` do controlador.
 */
uploadsRoutes.post("/", upload.single("file"), uploadsController.create);

export { uploadsRoutes };
