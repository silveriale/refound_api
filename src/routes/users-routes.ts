/****
 * Define as rotas HTTP de usuários.
 * Cria uma instância de Router do Express e a conecta aos handlers do UsersController (ex.: POST "/").
 */
import { Router } from "express";
import { UsersController } from "@/controllers/user-controller";

const usersRoutes = Router(); // Instancia um Router do Express para registrar endpoints relacionados a "users".
const usersController = new UsersController();// Cria a instância do UsersController que será usada como handler nas rotas abaixo.

usersRoutes.post("/", usersController.create); // Define a rota HTTP POST "/" deste router e associa ao método create do controller.

export { usersRoutes };
