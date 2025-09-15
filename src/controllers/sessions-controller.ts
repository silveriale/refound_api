/****
 * @file sessions-controller.ts
 * @description Controlador responsável pela autenticação (login).
 * Define handlers para criar sessões a partir da requisição HTTP.
 */

import type { SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

/**
 * Controller de sessões.
 * Agrupa os handlers responsáveis pela autenticação de usuários.
 */
class SessionsController {
  /**
   * Cria uma nova sessão (login).
   *
   * @param request Objeto da requisição HTTP contendo e-mail e senha.
   * @param response Objeto da resposta HTTP utilizado para retornar token e dados do usuário.
   * @throws {AppError} Caso o e-mail ou senha sejam inválidos.
   * @returns Retorna um objeto JSON com o token JWT e os dados do usuário autenticado.
   */
  async create(request: Request, response: Response) {
    /**
     * Schema de validação do corpo da requisição.
     * Define os campos obrigatórios: email e password.
     */
    const bodySchema = z.object({
      /**
       * Valida o campo `email`: deve ser string e ter formato válido de e-mail.
       */
      email: z.string().pipe(z.email({ error: "E-mail inválido" })),
      /**
       * Valida o campo `password`: deve ser string.
       * Regras adicionais podem ser aplicadas futuramente.
       */
      password: z.string(),
    });

    /**
     * Realiza o parse e validação do corpo da requisição,
     * extraindo os campos email e password.
     */
    const { email, password } = bodySchema.parse(request.body);

    /**
     * Busca no banco de dados o usuário correspondente ao e-mail informado.
     */
    const user = await prisma.user.findFirst({ where: { email } });

    /**
     * Caso nenhum usuário seja encontrado, lança erro de autenticação.
     */
    if (!user) {
      throw new AppError("E-mail ou senha inválida", 401);
    }

    /**
     * Compara a senha fornecida com o hash armazenado no banco de dados.
     */
    const passwordMatched = await compare(password, user.password);

    /**
     * Caso a senha não corresponda, lança erro de autenticação.
     */
    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválida", 401);
    }

    /**
     * Obtém chave secreta e tempo de expiração do token da configuração de autenticação.
     */
    const { secret, expiresIn } = authConfig.jwt;

    /**
     * Gera um token JWT para o usuário autenticado.
     * Inclui no payload apenas a role do usuário.
     */
    const token = sign(
      { role: user.role },
      secret as unknown as import("jsonwebtoken").Secret,
      {
        subject: String(user.id),
        expiresIn: expiresIn as SignOptions["expiresIn"],
      }
    );

    /**
     * Remove a senha do objeto usuário para não expor na resposta.
     */
    const { password: _, ...userWithoutPassord } = user;
    /**
     * Retorna o token JWT e os dados do usuário autenticado (sem senha).
     */
    response.json({ token, user: userWithoutPassord });
  }
}

export { SessionsController };
