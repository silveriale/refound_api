/**
 * @file verify-user-authorization.ts
 * @description Middleware responsável por verificar se o usuário autenticado
 * possui uma das roles autorizadas para acessar determinada rota.
 */
import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

/**
 * Cria um middleware para validar se o usuário autenticado possui uma das roles permitidas.
 *
 * @param role Array de roles autorizadas a acessar a rota.
 * @returns Middleware do Express que verifica a autorização do usuário.
 */
function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    /**
     * Verifica se o objeto `user` existe na requisição e se sua role está incluída no array de roles autorizadas.
     * Caso contrário, lança um erro de "Não autorizado" (401).
     */
    if (!request.user || !role.includes(request.user.role)) {
      throw new AppError("Não autorizado", 401);
    }
    /**
     * Se a verificação for bem-sucedida, permite a execução da próxima função middleware/handler.
     */
    return next();
  };
}

export { verifyUserAuthorization };
