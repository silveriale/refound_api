/**
 * Controlador de Sessões (autenticação/login).
 * Define handlers responsáveis por criar uma sessão (ex.: login) a partir da requisição HTTP.
 */

import { Request, Response } from "express";
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

    response.json({ email, password }); // Retorna em JSON os dados validados (apenas para teste).
  }
}

export { SessionsController };
