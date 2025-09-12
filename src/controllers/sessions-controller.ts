/**
 * Controlador de Sessões (autenticação/login).
 * Define handlers responsáveis por criar uma sessão (ex.: login) a partir da requisição HTTP.
 */

import { Request, Response } from "express";

// Declara o controller de sessões, que agrupa os handlers relacionados à autenticação.
class SessionsController {
  // Método assíncrono "create": recebe os dados de login na requisição e retorna a resposta ao cliente.
  async create(request: Request, response: Response) {
    // Envia uma resposta JSON simples confirmando a execução do endpoint (placeholder para a lógica de login).
    response.json({ message: "ok" });
  }
}

export { SessionsController };
