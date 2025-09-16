/*****
 * @file refunds-controller.ts
 * @description Controlador responsável por gerenciar reembolsos.
 * Define os métodos `create` (criação de reembolso) e `index` (listagem com paginação).
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

  /**
   * Lista os reembolsos cadastrados com suporte a paginação.
   *
   * @param request Objeto da requisição HTTP contendo os parâmetros de consulta (query),
   * incluindo nome do usuário, página atual (`page`) e quantidade por página (`perPage`).
   * @param response Objeto da resposta HTTP usado para retornar a lista de reembolsos paginados.
   * @returns Retorna um objeto JSON contendo a lista de reembolsos e os metadados de paginação.
   */
  async index(request: Request, response: Response) {
    /**
     * Schema de validação para os parâmetros de consulta.
     * Permite filtrar os reembolsos pelo nome do usuário.
     */
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    });

    const { name, page, perPage } = querySchema.parse(request.query);

    /**
     * Calcula o número de registros a serem ignorados com base na página atual e quantidade por página.
     */
    const skip = (page - 1) * perPage;
    /**
     * Busca os reembolsos no banco de dados aplicando:
     * - Filtro pelo nome do usuário (se fornecido),
     * - Paginação com base nos parâmetros `page` e `perPage`,
     * - Ordenação por data de criação (mais recentes primeiro),
     * - Inclusão dos dados do usuário associado.
     */
    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    /**
     * Conta o número total de registros que correspondem ao filtro aplicado.
     */
    const totalRecords = await prisma.refunds.count({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
    });

    /**
     * Calcula o total de páginas a partir da quantidade total de registros e do tamanho da página.
     */
    const totalPages = Math.ceil(totalRecords / perPage);

    /**
     * Retorna a lista de reembolsos encontrados e informações de paginação em formato JSON.
     */
    response.json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    });
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const refund = await prisma.refunds.findFirst({
      where: { id },
      include: { user: true },
    });

    response.json(refund);
  }
}

export { RefundsController };
