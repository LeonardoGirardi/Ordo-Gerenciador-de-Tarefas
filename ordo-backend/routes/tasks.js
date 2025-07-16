const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

let tasks = []; // Simulação de banco de dados

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.send(tasks);
});

router.post('/', (req, res) => {
  const task = { id: Date.now().toString(), ...req.body };
  tasks.push(task);
  res.status(201).send(task);
});

router.put('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) return res.status(404).send({ message: 'Tarefa não encontrada' });
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.send(tasks[taskIndex]);
});

router.delete('/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.status(204).send();
});

module.exports = router;
