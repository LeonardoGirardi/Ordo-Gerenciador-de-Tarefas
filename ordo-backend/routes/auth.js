const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const users = []; // Simulação de banco de dados

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.status(201).send({ message: 'Usuário registrado com sucesso' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ message: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;
