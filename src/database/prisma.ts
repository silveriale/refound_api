// Este arquivo cria e exporta uma instância do PrismaClient, que será usada em toda a aplicação para acessar e manipular o banco de dados.

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"], // Cria uma instância do PrismaClient e configura para logar todas as queries executadas
});
