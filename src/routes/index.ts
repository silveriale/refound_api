/**
 * @file index.ts
 * @description Centraliza e expõe o roteador raiz da API.
 * Cria uma instância de Router do Express e monta os módulos de rotas
 * (ex.: "/users", "/sessions", "/refunds"), para serem conectados no app principal.
 */
import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { refundsRoutes } from "./refunds-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { uploadsRoutes } from "./uploads-routes";

/**
 * Instância principal do Router do Express que irá agregar
 * todas as rotas públicas e privadas da aplicação.
 */
const routes = Router();

//Rotas Públicas

/**
 * Registra o módulo de rotas de usuários no caminho base "/users".
 * Exemplos de endpoints: POST /users.
 */
routes.use("/users", usersRoutes);

/**
 * Registra o módulo de rotas de sessões no caminho base "/sessions".
 * Exemplos de endpoints: POST /sessions.
 */
routes.use("/sessions", sessionsRoutes);

//Rotas privadas

/**
 * Aplica o middleware `ensureAuthenticated` a todas as rotas declaradas
 * depois desta linha. Garante que apenas usuários autenticados tenham acesso.
 */
routes.use(ensureAuthenticated);

/**
 * Registra o módulo de rotas de reembolsos no caminho base "/refunds".
 * Exemplos de endpoints: POST /refunds.
 */
routes.use("/refunds", refundsRoutes);

/**
 * Registra o módulo de rotas de upload de arquivos no caminho base "/uploads".
 * Exemplos de endpoints: POST /uploads.
 */
routes.use("/uploads", uploadsRoutes);

export { routes };
