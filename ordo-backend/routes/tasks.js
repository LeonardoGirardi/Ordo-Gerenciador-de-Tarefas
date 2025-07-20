const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { JWT_SECRET } = require('../config');

const router = express.Router();

// Middleware de autenticação
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).send({ error: 'Token inválido' });
  }
}

// Criar tarefa
router.post('/', auth, async (req, res) => {
  const { title, description, status, due_date } = req.body;
  try {
    const result = await pool.query(
        'INSERT INTO tasks (user_id, title, description, status, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [req.userId, title, description, status || 'todo', due_date]
    );

    const task = result.rows[0];

    res.status(201).send({
      id: task.id,
      titulo: task.title,
      descricao: task.description,
      status: task.status,
      data: task.due_date
    });
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(400).send({ error: 'Erro ao criar tarefa' });
  }
});

// Listar tarefas
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.userId]);
    const tasks = result.rows.map(task => ({
      id: task.id,
      titulo: task.title,
      descricao: task.description,
      status: task.status,
      data: task.due_date
    }));

    res.send(tasks);
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    res.status(500).send({ error: 'Erro ao listar tarefas' });
  }
});

// Listar tarefas por data
router.get('/:due_date', auth, async (req, res) => {
  const { due_date } = req.params;
  try {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1 AND due_date = $2',
        [req.userId, due_date]
    );

    const tasks = result.rows.map(task => ({
      id: task.id,
      titulo: task.title,
      descricao: task.description,
      status: task.status,
      data: task.due_date
    }));

    res.send(tasks);
  } catch (err) {
    console.error('Erro ao buscar tarefas por data:', err);
    res.status(500).send({ error: 'Erro ao buscar tarefas' });
  }
});

// Atualizar status da tarefa
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
        'UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
        [status, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ error: 'Tarefa não encontrada ou não pertence ao usuário' });
    }

    const task = result.rows[0];

    res.send({
      id: task.id,
      titulo: task.title,
      descricao: task.description,
      status: task.status,
      data: task.due_date
    });
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).send({ error: 'Erro ao atualizar tarefa' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.sendStatus(204); // No Content
  } catch (err) {
    console.error('Erro ao deletar tarefa:', err);
    res.status(500).json({ error: 'Erro interno ao deletar tarefa' });
  }
});
module.exports = router;

