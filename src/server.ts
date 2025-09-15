/****
 * @file server.ts
 * @description Ponto de entrada do servidor HTTP.
 * Importa a aplicação configurada em app.ts e inicia a escuta em uma porta específica.
 */

import { app } from "@/app";

const PORT = 3333; // Define a porta onde o servidor vai rodar

app.listen(
  PORT,
  () => console.log(`Servidor está rodando na porta ${PORT}`) // Inicia o servidor e mostra no console a porta em uso
);
