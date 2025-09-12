/****
 * Este arquivo define o controlador de usuários (UsersController)
 * responsável por lidar com as requisições relacionadas a usuários
*/

import { Request, Response } from "express"; 

class UsersController { // Declara uma classe chamada UsersController que agrupará os métodos relacionados a usuários.

  async create(request: Request, response: Response) { // Define um método assíncrono chamado "create", recebe dois parâmetros tipados pelo Express: request (body, params, query, etc.) e response (envia a resposta p o cliente).
    response.json({ message: "ok" }); // Retorna uma resposta em formato JSON com a chave "message" e o valor "ok", confirmando que a rota/método foi chamado corretamente.
  }
}

export { UsersController };
