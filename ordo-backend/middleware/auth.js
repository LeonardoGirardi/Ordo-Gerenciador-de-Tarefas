const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader); // ✅

  if (!authHeader) return res.status(401).send({ message: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secret_key');
    console.log('Decoded JWT:', decoded); // ✅
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT Error:', err); // ✅
    res.status(401).send({ message: 'Token inválido' });
  }
};
