import jwt from 'jsonwebtoken';

const verifySign = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: 'No tienes acceso' });
  }
  try {
    const payload = jwt.verify(token, process.env_SECRET_TOKEN);
    req.userId = payload;
    next();
  } catch (error) {
    res.status(401).send({ error: 'No tienes acceso' });
  }
};

export default verifySign;