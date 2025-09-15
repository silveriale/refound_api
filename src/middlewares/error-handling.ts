/****
 * @file error-handling.ts
 * @description Middleware global de tratamento de erros do Express.
 * Identifica diferentes tipos de erros (AppError, ZodError ou genéricos)
 */

import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError, z } from "zod";

/**
 * Middleware global de tratamento de erros do Express.
 * Recebe qualquer erro lançado durante o ciclo de requisição/resposta
 * e retorna uma resposta apropriada de acordo com o tipo de erro.
 */
export const errorHandling: ErrorRequestHandler = (
  error,
  /**
   * Objeto do erro capturado pelo Express.
   */ request,
  /**
   * Objeto da requisição HTTP.
   */ response,
  /**
   * Objeto da resposta HTTP.
   */ next
  /**
   * Função next do Express (não usada aqui, mas necessária na assinatura).
   */
) => {
  /**
   * Se o erro for do tipo AppError, retorna o status e a mensagem definidos.
   */
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  /**
   * Se o erro for de validação do Zod, retorna status 400 e os detalhes formatados.
   */
  if (error instanceof ZodError) {
    response.status(400).json({
      message: "erro de validação",
      /**
       * Estrutura os erros de validação em formato de árvore.
       */
      issues: z.treeifyError(error),
    });
    return;
  }

  /**
   * Se não for AppError nem ZodError, trata como erro interno genérico (500).
   */ response.status(500).json({ message: error.message });
  return;
};
