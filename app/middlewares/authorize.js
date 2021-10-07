const { User } = require("./.././models/index");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const JWT_ACCESS_SECRET = 'JWT_ACCESS_SECRET';

  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, JWT_ACCESS_SECRET, { expiresIn: '24h' }, (error, decoded) => {
    if (error) {
      return res.status(401).send({ error });
    }
    req.decoded = decoded;
    return User.findByPk(decoded.id)
      .then((user) => {
        if (!user) {
          return res.status(401).send({ error: 'User does not exist' });
        }
        return next();
      });
  });
}

module.exports = authorize;