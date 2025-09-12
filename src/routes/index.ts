/****
 * Centraliza e expõe o roteador raiz da API.
 * Cria uma instância de Router do Express e monta os módulos de rotas (ex.: "/users"), para serem conectados no app principal (app.use('/', routes)).
 */
import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { refundsRoutes } from "./refunds-routes";

const routes = Router(); // Cria a instância de Router que agregará todas as rotas públicas/privadas da API.

// Rotas públicas
routes.use("/users", usersRoutes); // Monta o módulo de usuários sob o caminho base "/users" (ex.: POST /users).
routes.use("/sessions", sessionsRoutes); // Monta o módulo de sessões sob o caminho base "/sessions" (ex.: POST /sessions).

// Rotas privadas
routes.use("/refunds", refundsRoutes); // Monta o módulo de reembolsos sob o caminho base "/refunds" (ex.: POST /refunds).

export { routes };
