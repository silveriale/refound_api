/****
 *  Este arquivo é o ponto de entrada do servidor HTTP, ele importa a aplicação configurada no app.ts
 * e inicia a escuta em uma porta específica.
 */

import { app } from "@/app";

const PORT = 3333; // Define a porta onde o servidor vai rodar

app.listen(
  PORT,
  () => console.log(`Servidor está rodando na porta ${PORT}`) // Inicia o servidor e mostra no console a porta em uso
);
