// Este arquivo configura a aplicação Express, adicionando middlewares globais (como JSON e CORS), e exporta a instância do app para que outro arquivo (ex.: server.ts com o app.listen).

import express from "express";
import cors from "cors"; // Importa o middleware CORS para permitir requisições de outros domínios

const app = express(); // Cria a instância da aplicação Express

app.use(express.json()); // Middleware: permite que o servidor entenda requisições com corpo JSON
app.use(cors()); //  Middleware: habilita CORS, permitindo que clientes externos acessem a API

app.get("/", (request, response) => {
  // Define uma rota GET para o caminho raiz "/"
  response.send("Hello World!"); // Quando essa rota é acessada, retorna o texto "Hello World!"
});

export { app }; // Exporta o app para ser importado e utilizado em outro arquivo (server.ts)
