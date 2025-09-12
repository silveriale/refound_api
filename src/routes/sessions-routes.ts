/**
 * Define as rotas de sessões (login/autenticação).
 * Cria uma instância de Router e mapeia os endpoints para o SessionsController.
 */

import { Router } from "express";
import { SessionsController } from "@/controllers/sessions-controller"; // Importa o controller responsável por lidar com as regras de autenticação/sessão.

const sessionsRoutes = Router(); // Cria uma instância de Router dedicada às rotas de sessões.

const sessionsController = new SessionsController(); // Instancia o SessionsController para associar seus métodos às rotas.

sessionsRoutes.post("/", sessionsController.create); // Define a rota HTTP POST "/" para criar uma sessão (ex.: login), utilizando o método create do controller.

export { sessionsRoutes };
