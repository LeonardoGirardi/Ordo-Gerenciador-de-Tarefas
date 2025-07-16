const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

const JWT_SECRET = 'fklsanfdnrwnlmnksjdnfcvgbrwsnndckhwb';

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
