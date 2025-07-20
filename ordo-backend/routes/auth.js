const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { JWT_SECRET } = require('../config');
const auth = require('../middleware/auth');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se usuário já existe
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).send({ error: 'Usuário já registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
    );

    const user = result.rows[0];
    res.status(201).send({ message: 'Usuário registrado com sucesso', user });
  } catch (err) {
    console.error('Erro no registro:', err);
    res.status(500).send({ error: 'Erro ao registrar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.send({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).send({ error: 'Erro no login' });
  }
});


router.get('/me', auth, async (req, res) => {
  try {
    const result = await pool.query(
        'SELECT id, name, email FROM users WHERE id = $1',
        [req.user.userId] // <--- aqui era o erro!
    );
    const user = result.rows[0];
    if (!user) return res.status(404).send({ error: 'Usuário não encontrado' });
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao buscar usuário' });
  }
});

router.put('/update-name', auth, async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, req.userId]);
    res.send({ message: 'Nome atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar nome:', err);
    res.status(500).send({ error: 'Erro ao atualizar nome' });
  }
});

router.put('/update-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await pool.query('SELECT password FROM users WHERE id = $1', [req.userId]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).send({ error: 'Senha atual incorreta' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, req.userId]);
    res.send({ message: 'Senha atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar senha:', err);
    res.status(500).send({ error: 'Erro ao atualizar senha' });
  }
});

module.exports = router;

