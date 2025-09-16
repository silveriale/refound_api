/**
 * Configura o upload de arquivos usando o Multer.
 * Define diretórios temporários e finais, limites de tamanho de arquivo,
 * tipos de arquivos aceitos e regras de nomenclatura dos arquivos enviados.
 */
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

/**
 * Diretório temporário onde os arquivos enviados são armazenados inicialmente.
 */
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

/**
 * Diretório final onde os arquivos enviados serão movidos após processamento.
 * É relativo ao TMP_FOLDER.
 */
const UPLOADS_FOLDER = path.relative(TMP_FOLDER, "uploads");

/**
 * Tamanho máximo permitido para upload de arquivos (em bytes).
 * Aqui está definido como 3MB.
 */
const MAX_FILE_SIZE = 1024 * 1024 * 3;

/**
 * Tipos MIME de imagens aceitos para upload.
 */
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

/**
 * Configuração do Multer para upload de arquivos.
 * Define o armazenamento em disco, diretório de destino e regras de nomeação dos arquivos.
 */
const MULTER = {
  storage: multer.diskStorage({
    // Define o diretório de destino dos arquivos enviados
    destination: TMP_FOLDER,
    // Define a função para gerar o nome do arquivo salvo
    filename(request, file, callback) {
      // Gera um hash aleatório para compor o nome do arquivo
      const fileHash = crypto.randomBytes(10).toString("hex");
      // Cria o nome do arquivo concatenando o hash e o nome original
      const fileName = `${fileHash}-${file.originalname}`;
      // Executa o callback passando o nome gerado
      return callback(null, fileName);
    },
  }),
};

export default {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MULTER,
};
