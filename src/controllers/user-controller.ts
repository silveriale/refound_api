/**
 * @file user-controller.ts
 * @description Controlador de Usuários (UsersController).
 * Define os métodos responsáveis por tratar as requisições HTTP relacionadas a usuários.
 */

import { Request, Response } from "express";
import { UserRole } from "@prisma/client"; // Importa o enum UserRole gerado pelo Prisma para tipar/validar a função do usuário.
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";
import { z } from "zod"; // Importa a biblioteca Zod para validação e transformação de dados de entrada.

/**
 * Controller de usuários.
 * Contém os métodos responsáveis pela criação e gerenciamento de usuários.
 */
class UsersController {
  /**
   * Cria um novo usuário.
   *
   * @param request Objeto da requisição HTTP contendo os dados do novo usuário.
   * @param response Objeto da resposta HTTP usado para retornar o resultado da operação.
   * @throws {AppError} Caso já exista um usuário com o mesmo e-mail.
   * @returns Retorna status 201 em caso de sucesso, sem corpo de resposta.
   */
  async create(request: Request, response: Response) {
    /**
     * Schema de validação dos dados recebidos no corpo da requisição.
     */
    const bodySchema = z.object({
      /**
       * Campo `name`: deve ser string, sem espaços extras e com no mínimo 2 caracteres.
       */
      name: z.string().trim().min(2, { message: "Nome é obrigatório!" }),
      /**
       * Campo `email`: convertido para minúsculas, sem espaços, deve ter formato válido.
       */
      email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({ error: "E-mail inválido" })),
      /**
       * Campo `password`: deve ser string com pelo menos 6 caracteres.
       */
      password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 dígitos" }),
      /**
       * Campo `role`: deve ser um dos valores do enum UserRole (`employee` ou `manager`).
       * Por padrão é `employee`.
       */
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    /**
     * Realiza o parse e validação do corpo da requisição com base no schema definido.
     */
    const { name, email, password, role } = bodySchema.parse(request.body);

    /**
     * Verifica no banco de dados se já existe um usuário com o mesmo e-mail.
     */
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    /**
     * Caso já exista um usuário com o mesmo e-mail, lança um erro de aplicação.
     */
    if (userWithSameEmail) {
      throw new AppError("Já existe um usuário cadastrado com esse e-mail");
    }

    /**
     * Gera o hash da senha utilizando bcrypt com salt de custo 8.
     */
    const hashedPassword = await hash(password, 8);

    /**
     * Cria o usuário no banco de dados com os dados validados
     * e a senha já criptografada.
     */
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    /**
     * Retorna status 201 (Created) sem corpo de resposta.
     */
    response.status(201).json();
  }
}

export { UsersController };
