/****
 * Controlador de Reembolsos (RefundsController).
 * Responsável por lidar com as requisições HTTP relacionadas a reembolsos.
 */

import { Request, Response } from "express";

// Declara a classe RefundsController que agrupará os métodos responsáveis por tratar reembolsos.
class RefundsController {
  // Método assíncrono "create": lida com a criação de um novo reembolso. Recebe a requisição e envia uma resposta JSON como confirmação.
  async create(request: Request, response: Response) {
    // Retorna uma resposta JSON simples confirmando a chamada do endpoint.
    response.json({ message: "ok" });
  }
}

export { RefundsController };
