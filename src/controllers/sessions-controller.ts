/**
 * Controlador de Sessões (autenticação/login).
 * Define handlers responsáveis por criar uma sessão (ex.: login) a partir da requisição HTTP.
 */

import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { z } from "zod";

// Declara o controller de sessões, que agrupa os handlers relacionados à autenticação.
class SessionsController {
  // Método assíncrono "create": recebe os dados de login na requisição e retorna a resposta ao cliente.
  async create(request: Request, response: Response) {
    // Define o schema de validação do corpo da requisição (campos necessários para login).
    const bodySchema = z.object({
      email: z.string().pipe(z.email({ error: "E-mail inválido" })), // Valida o campo "email": garante que seja string e que tenha formato de e-mail válido.
      password: z.string(), // Valida o campo "password": garante que seja string (pode incluir regras adicionais futuramente).
    });

    // Realiza o parse e validação do corpo da requisição de acordo com o schema definido acima, extraindo email e password.
    const { email, password } = bodySchema.parse(request.body);

    // Busca no banco de dados o usuário que possua o e-mail informado.
    const user = await prisma.user.findFirst({ where: { email } });

    // Se nenhum usuário for encontrado, lança um erro de autenticação.
    if (!user) {
      throw new AppError("E-mail ou senha inválida", 401);
    }

    // Compara a senha fornecida com o hash de senha armazenado no banco.
    const passwordMatched = await compare(password, user.password);

    // Se a senha não corresponder, lança um erro de autenticação.
    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválida", 401);
    }

    response.json({ email, password }); // Retorna em JSON os dados validados (apenas para teste).
  }
}

export { SessionsController };
