/*****
 * @file refunds-controller.ts
 * @description Controlador responsável por gerenciar reembolsos.
 * Define o método `create` que valida os dados da requisição e cria uma solicitação de reembolso.
 */
import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

/**
 * Enumeração de categorias válidas para reembolso.
 * Utiliza o Zod para restringir os valores aceitos.
 */
const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
]);

/**
 * Controller de reembolsos.
 * Contém os métodos responsáveis por lidar com as requisições relacionadas a reembolsos.
 */
class RefundsController {
  /**
   * Cria uma nova solicitação de reembolso.
   *
   * @param request Objeto da requisição HTTP contendo os dados enviados pelo cliente.
   * @param response Objeto da resposta HTTP usado para retornar a confirmação.
   * @returns Retorna o objeto JSON do reembolso criado.
   */
  async create(request: Request, response: Response) {
    /**
     * Schema de validação do corpo da requisição usando Zod.
     * Define os campos obrigatórios para criar um reembolso.
     */
    const bodySchema = z.object({
      /**
       * Campo `name`: nome da solicitação de reembolso.
       * Deve ser string, sem espaços extras e conter ao menos 1 caractere.
       */
      name: z
        .string()
        .trim()
        .min(1, { message: "Informe o nome da solicitação" }),
      /**
       * Campo `category`: categoria do reembolso.
       * Deve ser um dos valores definidos em CategoriesEnum.
       */
      category: CategoriesEnum,
      /**
       * Campo `amount`: valor do reembolso.
       * Deve ser um número positivo.
       */
      amount: z.number().positive({ message: "O valor precisa ser positivo!" }),
      /**
       * Campo `filename`: nome do arquivo associado ao reembolso.
       * Deve ser uma string com no mínimo 20 caracteres.
       */
      filename: z.string().min(20),
    });

    /**
     * Realiza o parse e validação do corpo da requisição,
     * extraindo os campos name, category, amount e filename.
     */
    const { name, category, amount, filename } = bodySchema.parse(request.body);

    /**
     * Verifica se o usuário está autenticado.
     * Caso contrário, lança um erro de "Não autorizado".
     */
    if (!request.user?.id) {
      throw new AppError("Não autorizado");
    }

    /**
     * Cria um novo registro de reembolso no banco de dados associado ao usuário autenticado.
     */
    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user.id,
      },
    });

    /**
     * Retorna status 201 (Created) e o objeto do reembolso criado em formato JSON.
     */
    response.status(201).json(refund);
  }

  async index(request: Request, response: Response) {
    response.json({ message: "ok" });
  }
}

export { RefundsController };
