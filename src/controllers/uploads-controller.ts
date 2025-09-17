/**
 * @file uploads-controller.ts
 * @description Controlador responsável por gerenciar uploads de arquivos. Valida os dados do arquivo,
 * salva no armazenamento em disco e trata erros de validação.
 */
import { Request, Response } from "express";
import z, { ZodError } from "zod";
import uploadConfig from "@/configs/upload";
import { DiskStorage } from "@/providers/disk-storage";
import { AppError } from "@/utils/AppError";

/**
 * Classe responsável por lidar com requisições relacionadas a uploads de arquivos.
 * Encapsula a lógica de validação com Zod e persistência usando DiskStorage.
 * @class
 */
class UploadsController {
  /**
   * Cria um upload de arquivo a partir de uma requisição.
   * - Valida os dados do arquivo usando Zod.
   * - Salva o arquivo utilizando DiskStorage.
   * - Remove arquivos inválidos em caso de erro de validação.
   * @param {Request} request - Objeto da requisição Express contendo o arquivo.
   * @param {Response} response - Objeto da resposta Express usado para retornar o resultado.
   * @returns {Promise<void>} Retorna uma resposta JSON com o nome do arquivo salvo.
   * @throws {AppError} Se a validação do arquivo falhar.
   */
  async create(request: Request, response: Response) {
    /** Instancia o provedor de armazenamento em disco para manipular arquivos. */
    const diskStorage = new DiskStorage();

    try {
      /** Define o schema de validação para o arquivo recebido, incluindo nome, tipo MIME e tamanho. */
      const fileSchema = z
        .object({
          filename: z.string().min(1, "Arquivo é obrigatório"),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              `Formato de arquivo inválido, formatos permitidos: ${uploadConfig.ACCEPTED_IMAGE_TYPES}`
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => size <= uploadConfig.MAX_FILE_SIZE,
              `Arquivo excede o tamanho máximo de ${uploadConfig.MAX_SIZE} MB`
            ),
        })
        .catchall(z.any());

      /** Faz o parse e validação do arquivo recebido na requisição. */
      const file = fileSchema.parse(request.file);
      /** Salva o arquivo validado no armazenamento em disco e retorna o nome do arquivo. */
      const filename = await diskStorage.saveFile(file.filename);

      /** Retorna uma resposta JSON contendo o nome do arquivo salvo. */
      response.json({ filename });
    } catch (error) {
      /** Trata erros de validação do Zod (schema inválido). */
      if (error instanceof ZodError) {
        /** Se o arquivo foi enviado mas falhou na validação, remove-o da pasta temporária. */
        if (request.file) {
          await diskStorage.deleteFile(request.file.filename, "tmp");
        }

        /** Lança um erro de aplicação com a mensagem de validação. */
        throw new AppError(error.issues[0].message);
      }
      /** Repassa outros erros não relacionados à validação. */
      throw error;
    }
  }
}

export { UploadsController };
