/**
 * @file refunds-routes.ts
 * @description Define as rotas relacionadas a reembolsos (refunds).
 * Cria uma instância de Router do Express e associa os endpoints ao RefundsController.
 */

import { Router } from "express";
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

/**
 * Cria uma instância de Router dedicada às rotas de reembolsos.
 */
const refundsRoutes = Router();

/**
 * Instancia o RefundsController para conectar os métodos às rotas.
 */
const refundsController = new RefundsController();

/**
 * Define a rota HTTP POST "/" para criar um novo reembolso.
 * Aplica o middleware `verifyUserAuthorization` para restringir o acesso
 * a usuários com a role "employee".
 * Em seguida, chama o método `create` do RefundsController.
 */
refundsRoutes.post(
  "/",
  verifyUserAuthorization(["employee"]),
  refundsController.create
);

/**
 * Define a rota HTTP GET "/" para listar todos os reembolsos.
 * Aplica o middleware `verifyUserAuthorization` para restringir o acesso
 * a usuários com a role "manager".
 * Em seguida, chama o método `index` do RefundsController.
 */
refundsRoutes.get(
  "/",
  verifyUserAuthorization(["manager"]),
  refundsController.index
);

/**
 * Define a rota HTTP GET "/:id" para buscar os detalhes de um reembolso específico.
 * Aplica o middleware `verifyUserAuthorization` para restringir o acesso
 * a usuários com as roles "employee" e "manager".
 * Em seguida, chama o método `show` do RefundsController.
 */
refundsRoutes.get(
  "/:id",
  verifyUserAuthorization(["employee", "manager"]),
  refundsController.show
);
export { refundsRoutes };
