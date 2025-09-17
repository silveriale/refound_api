/**
 * @file Gerencia o armazenamento em disco para uploads.
 * @description Fornece operações para salvar (mover de TMP para UPLOADS) e deletar arquivos do sistema de arquivos.
 */

import fs from "node:fs";
import path from "node:path";
import uploadConfig from "@/configs/upload";

/**
 * Encapsula operações de armazenamento em disco.
 * Responsável por mover arquivos do diretório temporário para o diretório final
 * e por remover arquivos quando necessário.
 * @class
 */
class DiskStorage {
  /**
   * Move um arquivo da pasta temporária para a pasta de uploads.
   * @param {string} file - Nome do arquivo (sem caminho) a ser persistido.
   * @returns {Promise<string>} Retorna o próprio nome do arquivo após a operação.
   * @throws {Error} Lança erro se o arquivo não existir na pasta temporária.
   */
  async saveFile(file: string) {
    /** Resolve o caminho absoluto do arquivo dentro da pasta temporária (TMP). */
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file);
    /** Resolve o caminho absoluto do arquivo na pasta definitiva de uploads (UPLOADS). */
    const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      /** Verifica se o arquivo realmente existe em TMP; lança se não houver permissão/acesso. */
      await fs.promises.access(tmpPath);
    } catch (error) {
      /** Tratamento quando o arquivo não é encontrado em TMP: interrompe o fluxo com um erro descritivo. */
      throw new Error(`Arquivo não encontrado: ${tmpPath}`);
    }

    /** Garante que a pasta de uploads exista; cria recursivamente se necessário. */
    await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true });
    /** Move (renomeia) o arquivo de TMP para UPLOADS de forma atômica no mesmo disco. */
    await fs.promises.rename(tmpPath, destPath);

    /** Retorna o nome do arquivo persistido para uso por camadas superiores. */
    return file;
  }

  /**
   * Remove um arquivo do sistema de arquivos, escolhendo entre TMP ou UPLOADS.
   * @param {string} file - Nome do arquivo a ser removido.
   * @param {"tmp"|"upload"} type - Indica de qual pasta o arquivo deve ser apagado.
   * @returns {Promise<void>} Não retorna valor; conclui após a remoção (ou se o arquivo não existir).
   */
  async deleteFile(file: string, type: "tmp" | "upload") {
    /** Seleciona a pasta base a partir do tipo informado (TMP ou UPLOADS). */
    const pathFile =
      type === "tmp" ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER;

    /** Resolve o caminho absoluto completo do arquivo a ser removido. */
    const filePath = path.resolve(pathFile, file);

    try {
      /** Verifica metadados do arquivo para confirmar sua existência antes de tentar removê-lo. */
      await fs.promises.stat(filePath);
    } catch {
      /** Se o arquivo não existir, encerra silenciosamente sem erro (idempotência da operação). */
      return;
    }

    /** Exclui o arquivo do sistema de arquivos. */
    await fs.promises.unlink(filePath);
  }
}

export { DiskStorage };
