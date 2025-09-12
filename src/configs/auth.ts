/****
 * Configurações de autenticação da aplicação.
 * Define os valores utilizados para gerar e validar tokens JWT (chave secreta e tempo de expiração).
 */

// Objeto de configuração principal de autenticação.
export const authConfig = {
  jwt: {
    // Chave secreta usada para assinar os tokens JWT (lida da variável de ambiente JWT_SECRET).
    secret: process.env.JWT_SECRET,
    // Tempo de expiração do token JWT (lido da variável de ambiente JWT_EXPIRES_IN)
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
