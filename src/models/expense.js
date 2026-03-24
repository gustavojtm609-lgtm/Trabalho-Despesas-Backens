// Importa a função v4 da biblioteca uuid e a renomeia para uuidv4
const { v4: uuidv4 } = require('uuid');

// Array que servirá como banco de dados temporário (em memória)
let expenses = [];

const ExpenseModel = {
  // Retorna a lista completa de despesas
  getAll: () => expenses,
  
  // Procura uma despesa específica pelo ID dentro do array
  getById: (id) => expenses.find(exp => exp.id === id),

  
  // Cria um novo objeto de despesa com ID automático e data
  create: (data) => {
  // Validação: Impede data no futuro
  const dataInformada = new Date(data.date);
  const agora = new Date();

    if (dataInformada > agora) {
    // Lançamos um erro que será capturado pelo try/catch no app.js
    throw new Error("A data da despesa não pode estar no futuro.");
    }
    const newExpense = {
      id: uuidv4(), // Gera um ID único (Ex: 71b5e5ca...)
      title: data.title,
      amount: data.amount, //quantia
      category: data.category || 'Outros',
      date: data.date,
      description: data.description || '',
      createdAt: new Date().toISOString() // Salva o momento exato da criação
    };
    expenses.push(newExpense); // Adiciona ao "banco de dados"
    return newExpense;
  },
  
  // Localiza a despesa pelo ID e atualiza apenas os campos enviados
  update: (id, data) => {
    const index = expenses.findIndex(exp => exp.id === id);
    if (index === -1) return null; // Se não achar o ID, retorna nulo
    
    // Mantém o que já existia e sobrescreve com as novas informações
    expenses[index] = { ...expenses[index], ...data };
    return expenses[index];
  },
  
  // Remove a despesa do array usando a posição (index) dela
  delete: (id) => {
    const index = expenses.findIndex(exp => exp.id === id);
    if (index === -1) return false;
    expenses.splice(index, 1); // Remove 1 item a partir daquela posição
    return true;
  }
};

// Exporta o modelo para que o app.js consiga usar essas funções
module.exports = ExpenseModel;