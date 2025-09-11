// Este arquivo configura a aplicação Express (middlewares e rotas base), e exporta a instância do app para que outro arquivo (ex.: server.ts com o app.listen).

import express from "express";

const app = express(); // Cria a instância da aplicação Express

app.use(express.json()); // Middleware: permite que o servidor entenda requisições com corpo JSON

app.get("/", (request, response) => {
  // Define uma rota GET para o caminho raiz "/"
  response.send("Hello World!"); // Quando essa rota é acessada, retorna o texto "Hello World!"
});

export { app }; // Exporta o app para ser importado e utilizado em outro arquivo (server.ts)
