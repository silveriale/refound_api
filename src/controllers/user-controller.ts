/****
 * Controlador de Usuários (UsersController).
 * Define os métodos responsáveis por tratar as requisições HTTP relacionadas a usuários.
 */

import { Request, Response } from "express";
import { UserRole } from "@/generated/prisma"; // Importa o enum UserRole gerado pelo Prisma para tipar/validar a função do usuário.
import { z } from "zod"; // Importa a biblioteca Zod para validação e transformação de dados de entrada.

class UsersController {
  // Método assíncrono "create": responsável por cadastrar um novo usuário. Recebe o corpo da requisição, valida os dados com Zod e retorna a resposta em JSON.
  async create(request: Request, response: Response) {
    // Define o schema de validação dos dados recebidos no corpo da requisição.
    const bodySchema = z.object({
      // Valida o campo "name": deve ser string, removendo espaços extras e ter no mínimo 2 caracteres.
      name: z.string().trim().min(2, { message: "Nome é obrigatório!" }),
      // Valida o campo "email": converte para minúsculas, remove espaços e garante formato válido de e-mail.
      email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({ error: "E-mail inválido" })),
      // Valida o campo "password": deve ser string com pelo menos 6 caracteres.
      password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 dígitos" }),
      // Valida o campo "role": deve ser um dos valores do enum UserRole (employee ou manager), padrão é employee.
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    });

    // Realiza o parse e validação do corpo da requisição de acordo com o schema definido acima.
    const { name, email, password, role } = bodySchema.parse(request.body);

    response.json({ name, email, password, role }); // Retorna os dados validados em formato JSON como resposta da requisição.
  }
}

export { UsersController };
