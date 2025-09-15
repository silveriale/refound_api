/**
 * @file app.ts
 * @description Configura a aplicação Express.
 * Adiciona middlewares globais (JSON, CORS), registra as rotas e o middleware de tratamento de erros.
 * Exporta a instância do app para ser utilizada no server.ts com `app.listen()`.
 */

import express from "express";
import cors from "cors"; // Importa o middleware CORS para permitir requisições de outros domínios

import { routes } from "./routes";
import { errorHandling } from "@/middlewares/error-handling"; // Middleware personalizado de tratamento de erros

const app = express(); // Cria a instância da aplicação Express

app.use(cors()); // habilita CORS, permitindo que clientes externos acessem a API
app.use(express.json()); // permite que o servidor entenda requisições com corpo JSON

app.use(routes); // Monta o roteador raiz da aplicação (todas as rotas registradas)
app.use(errorHandling); // registra o middleware de tratamento de erros (precisa ficar após as rotas)

export { app }; // Exporta o app para ser importado e utilizado em outro arquivo (server.ts)
