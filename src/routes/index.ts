/**
 * Centraliza e expõe o roteador raiz da API.
 * Cria uma instância de Router do Express e monta os módulos de rotas (ex.: "/users"), para serem conectados no app principal (app.use('/', routes)).
 */
import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";

const routes = Router(); // Cria a instância de Router que agregará todas as rotas públicas/privadas da API.

//Rotas públicas
routes.use("/users", usersRoutes); // Monta o módulo de usuários sob o caminho base "/users" (ex.: POST /users).
routes.use("/sessions", sessionsRoutes); // Monta o módulo de sessões sob o caminho base "/sessions" (ex.: POST /sessions).

export { routes };
