/****
 * @file ensure-authenticated.ts
 * @description Middleware responsável por validar a autenticação do usuário
 * através de um token JWT antes de permitir acesso a rotas protegidas.
 */

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

/**
 * Interface que representa a estrutura dos dados contidos no payload do token JWT.
 * - role: Define o papel do usuário (ex: "admin", "user").
 * - sub: Identificador único do usuário (geralmente o ID no banco de dados).
 */
interface TokenPayload {
  role: string;
  sub: string;
}

/**
 * Middleware que garante que o usuário esteja autenticado antes de acessar rotas protegidas.
 *
 * @param request - Objeto de requisição do Express, contendo informações da requisição HTTP.
 * @param response - Objeto de resposta do Express, usado para enviar uma resposta ao cliente.
 * @param next - Função callback que passa o controle para o próximo middleware.
 */
function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    /**
     * Obtém o cabeçalho de autorização da requisição.
     */
    const authHeader = request.headers.authorization;

    /**
     * Caso o cabeçalho de autorização não exista, lança um erro de autenticação.
     */
    if (!authHeader) {
      throw new AppError("JWT token nao encontrado", 401);
    }

    /**
     * Extrai o token JWT do cabeçalho de autorização.
     * O formato esperado é: "Bearer <token>".
     */
    const [, token] = authHeader.split(" ");

    /**
     * Verifica e decodifica o token JWT utilizando o segredo configurado.
     */
    const { role, sub: user_id } = verify(
      token,
      String(authConfig.jwt.secret)
    ) as TokenPayload;

    /**
     * Adiciona as informações do usuário autenticado (id e role)
     * ao objeto `request` para serem usadas posteriormente.
     */
    request.user = {
      id: user_id,
      role,
    };
    /**
     * Continua o fluxo da requisição chamando o próximo middleware ou rota.
     */
    return next();
  } catch (error) {
    /**
     * Caso o token seja inválido ou ocorra qualquer erro na validação,
     * lança um erro de autenticação.
     */
    throw new AppError("JWT token inválido");
  }
}

export { ensureAuthenticated };
