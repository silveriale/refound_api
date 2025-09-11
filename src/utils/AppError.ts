// Este arquivo define a classe AppError, usada para padronizar e lançar erros na aplicação. Ela encapsula uma mensagem e um status HTTP, facilitando o tratamento no middleware de erros.

class AppError {
  message: string; // Propriedade que guarda a mensagem do erro
  statusCode: number; // Propriedade que guarda o código de status HTTP do erro

  constructor(message: string, statusCode: number = 400) {
    this.message = message; // Define a mensagem recebida no construtor
    this.statusCode = statusCode; // Define o código de status, padrão 400 (Bad Request)
  }
}

export { AppError };
