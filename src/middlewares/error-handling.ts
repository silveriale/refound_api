// Este arquivo define o middleware global de tratamento de erros do Express, identifica diferentes tipos de erros (AppError, ZodError ou genéricos) e retorna uma resposta HTTP adequada para cada caso.

import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError, z } from "zod";

export const errorHandling: ErrorRequestHandler = (
  error, // Objeto do erro capturado pelo Express
  request, // Objeto da requisição HTTP
  response, // Objeto da resposta HTTP
  next // Função next do Express (não usada aqui, mas precisa existir na assinatura)
) => {
  if (error instanceof AppError) {
    // Se o erro for do tipo AppError, retorna o status e a mensagem definidos pelo AppError
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    // Se o erro for de validação do Zod, retorna status 400 e os detalhes dos erros formatados
    response.status(400).json({
      message: "erro de validação",
      issues: z.treeifyError(error), // Estrutura os erros de validação em formato de árvore
    });
    return;
  }

  // Se não for AppError nem ZodError, trata como erro interno genérico (500)
  response.status(500).json({ message: error.message });
  return;
};
