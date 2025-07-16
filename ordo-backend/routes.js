
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const router = express.Router();
const JWT_SECRET = 'segredo123';

// Registro
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hash]
        );
        res.status(201).send({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err); // <-- Adicione isso
        res.status(400).send({ error: 'Erro ao registrar usuário' });
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
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.send({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).send({ error: 'Erro no login' });
    }
});

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
router.post('/tasks', auth, async (req, res) => {
    const { title, description, status, due_date } = req.body;
    try {
        await pool.query(
            'INSERT INTO tasks (user_id, title, description, status, due_date) VALUES ($1, $2, $3, $4, $5)',
            [req.userId, title, description, status || 'todo', due_date]
        );
        res.status(201).send({ message: 'Tarefa criada' });
    } catch (err) {
        res.status(400).send({ error: 'Erro ao criar tarefa' });
    }
});

// Listar tarefas
router.get('/tasks', auth, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.userId]);
        res.send(result.rows);
    } catch (err) {
        res.status(500).send({ error: 'Erro ao listar tarefas' });
    }
});

module.exports = router;
