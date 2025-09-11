// Este arquivo configura a aplicação Express, adicionando middlewares globais (como JSON e CORS) registrando o middleware de tratamento de erros, e exporta a instância do app para que para que o server.ts a utilize com app.listen().


import express from "express";
import cors from "cors"; // Importa o middleware CORS para permitir requisições de outros domínios

import { errorHandling } from "@/middlewares/error-handling"; // Middleware personalizado de tratamento de erros


const app = express(); // Cria a instância da aplicação Express

app.use(express.json()); // permite que o servidor entenda requisições com corpo JSON
app.use(cors()); // habilita CORS, permitindo que clientes externos acessem a API

app.use(errorHandling); // registra o middleware de tratamento de erros (precisa ficar após as rotas)


export { app }; // Exporta o app para ser importado e utilizado em outro arquivo (server.ts)
