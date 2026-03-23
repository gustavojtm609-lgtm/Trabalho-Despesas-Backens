const express = require('express');
const ExpenseModel = require('./models/expense'); // Importa a lógica dos dados

const app = express();
app.use(express.json()); // Configura o servidor para entender JSON no corpo das requisições

// Rota Extra: Soma todos os valores de despesas cadastradas
app.get('/expenses/summary/total', (req, res) => {
  const expenses = ExpenseModel.getAll();
  // O reduce percorre a lista e soma os campos 'amount'
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  res.json({ total });
});

// Rota POST: Recebe dados do Postman e cria uma nova despesa
// http://localhost:3000/expenses
//{"title": "Supermercado Mensal","amount": 450.80,"category": "Alimentação","date": "2026-03-23","description": "Compras do mês no mercado local"}
app.post('/expenses', (req, res) => {
  const { title, amount } = req.body;
  // Validação simples: não deixa criar sem título ou valor zero
  if (!title) return res.status(400).json({ error: "O campo title é obrigatório" });
  if (amount <= 0) return res.status(400).json({ error: "O amount deve ser maior que zero" });

  const newExpense = ExpenseModel.create(req.body);
  res.status(201).json(newExpense); // Retorna 201 (Criado com sucesso)
});

// Rota GET: Retorna todas as despesas para o navegador ou Postman
app.get('/expenses', (req, res) => {
  res.json(ExpenseModel.getAll());
});

// Rota PUT: Atualiza uma despesa baseada no ID passado na URL
app.put('/expenses/:id', (req, res) => {
  const updatedExpense = ExpenseModel.update(req.params.id, req.body);
  if (!updatedExpense) return res.status(404).json({ error: "Despesa não encontrada" });
  res.json(updatedExpense);
});

// Rota DELETE: Remove uma despesa baseada no ID passado na URL
app.delete('/expenses/:id', (req, res) => {
  const deleted = ExpenseModel.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Despesa não encontrada" });
  res.status(204).send(); // 204 significa sucesso mas sem conteúdo para exibir
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});