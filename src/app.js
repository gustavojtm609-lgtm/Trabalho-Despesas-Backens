const express = require('express');
const cors = require('cors');

// 1. IMPORTANDO A SUA VIEW DE USUÁRIO (INSTÂNCIA)
const UserView = require('./view/user');

// Mantendo o seu mock antigo para não quebrar as rotas de despesas já feitas
const ExpenseModel = require('./models/expense'); 

const app = express();

// 2. MIDDLEWARES GLOBAIS
app.use(cors()); // Libera o acesso para o seu React (http://localhost:5173)
app.use(express.json()); // Permite que o Express entenda requisições em formato JSON

// =========================================================
// 🚀 ROTAS DE AUTENTICAÇÃO
// =========================================================

// Rota de Login
app.post('/api/auth/login', (req, res) => UserView.login(req, res));

// Rota de Cadastro (Mapeada para aceitar tanto 'register' quanto 'signup')
app.post('/api/auth/register', (req, res) => UserView.create(req, res));
app.post('/api/auth/signup', (req, res) => UserView.create(req, res));


// =========================================================
// 💰 SUAS ROTAS ANTIGAS DE DESPESAS 
// =========================================================
app.get('/expenses/summary/total', (req, res) => {
  const expenses = ExpenseModel.getAll();
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  res.json({ total });
});

app.post('/expenses', (req, res) => {
  const { title, amount } = req.body;
  if (!title) return res.status(400).json({ error: "O campo title é obrigatório" });
  if (amount <= 0) return res.status(400).json({ error: "O amount deve ser maior que zero" });
  
  const newExpense = ExpenseModel.create(req.body);
  res.status(201).json(newExpense);
});

app.get('/expenses', (req, res) => {
  res.json(ExpenseModel.getAll());
});

app.put('/expenses/:id', (req, res) => {
  const updatedExpense = ExpenseModel.update(req.params.id, req.body);
  if (!updatedExpense) return res.status(404).json({ error: "Despesa não encontrada" });
  res.json(updatedExpense);
});

app.delete('/expenses/:id', (req, res) => {
  const deleted = ExpenseModel.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Despesa não encontrada" });
  res.status(204).send(); 
});

// =========================================================
// INICIALIZAÇÃO DO SERVIDOR
// =========================================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`💾 [Banco de Dados] Conectado com sucesso!`);
  console.log(`=========================================`);
});