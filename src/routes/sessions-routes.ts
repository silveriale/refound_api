/**
 * @file sessions-routes.ts
 * @description Define as rotas de sessões (login/autenticação).
 * Cria uma instância de Router e mapeia os endpoints para o SessionsController.
 */

import { Router } from "express";
/**
 * Importa o controller responsável por lidar com as regras de autenticação/sessão.
 */
import { SessionsController } from "@/controllers/sessions-controller";

/**
 * Cria uma instância de Router dedicada às rotas de sessões.
 */
const sessionsRoutes = Router();

/**
 * Instancia o SessionsController para associar seus métodos às rotas.
 */
const sessionsController = new SessionsController();

/**
 * Define a rota HTTP POST "/" para criar uma sessão (ex.: login).
 * Utiliza o método `create` do SessionsController.
 */
sessionsRoutes.post("/", sessionsController.create);

export { sessionsRoutes };
