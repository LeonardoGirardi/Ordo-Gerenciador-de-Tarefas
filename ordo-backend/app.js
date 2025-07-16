// ordo-backend/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Ordo API está rodando');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});