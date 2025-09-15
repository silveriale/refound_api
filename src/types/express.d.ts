/****
 * @file express.d.ts
 * @description Arquivo de definição de tipos que estende o comportamento do Express,
 * permitindo incluir dados do usuário autenticado dentro da interface `Request`.
 */

/**
 * Declara o namespace `Express` para que possamos sobrescrever ou adicionar
 * definições de tipos ao pacote original.
 */
declare namespace Express {
  /**
   * Interface `Request` original do Express estendida para incluir novas propriedades.
   */
  export interface Request {
    /**
     * Propriedade opcional `user`.
     * Disponível em cada requisição, armazenando dados do usuário autenticado.
     */
    user?: {
      /**
       * Representa o identificador único do usuário.
       */
      id: string;
      /**
       * Representa o papel (role) do usuário no sistema, como por exemplo 'admin' ou 'user'.
       */
      role: string;
    };
  }
}
