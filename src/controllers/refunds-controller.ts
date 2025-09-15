/****
 * Controlador de Reembolsos (RefundsController).
 * Responsável por lidar com as requisições HTTP relacionadas a reembolsos.
 */

import { Request, Response } from "express";

// Declara a classe RefundsController que agrupará os métodos responsáveis por tratar reembolsos.
class RefundsController {
  /**
   * Cria um novo reembolso.
   *
   * @param request Objeto da requisição HTTP do Express, contendo os dados enviados pelo cliente.
   * @param response Objeto da resposta HTTP do Express, usado para retornar a confirmação.
   * @returns Retorna uma resposta JSON confirmando a chamada do endpoint.
   */
  async create(request: Request, response: Response) {
    // Retorna uma resposta JSON simples confirmando a chamada do endpoint.
    response.json({ message: "ok" });
  }
}

export { RefundsController };
