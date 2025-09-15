/****
 * @file prisma.ts
 * @description Cria e exporta uma instância do PrismaClient
 * para ser usada em toda a aplicação na manipulação do banco de dados.
 */

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"]
  /**
   * Cria uma instância do PrismaClient e configura para registrar logs de todas as queries executadas.
   */,
});
