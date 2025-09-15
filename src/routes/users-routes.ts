/****
 * @file users-routes.ts
 * @description Define as rotas HTTP de usuários.
 * Cria uma instância de Router do Express e a conecta aos handlers do UsersController.
 */
import { Router } from "express";
import { UsersController } from "@/controllers/user-controller";

/**
 * Instancia um Router do Express para registrar endpoints relacionados a usuários.
 */
const usersRoutes = Router();
/**
 * Cria a instância do UsersController que será usada como handler nas rotas.
 */
const usersController = new UsersController();
/**
 * Define a rota HTTP POST "/" deste router e associa ao método `create` do UsersController.
 */
usersRoutes.post("/", usersController.create);

export { usersRoutes };
