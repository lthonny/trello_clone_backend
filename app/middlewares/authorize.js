const { User } = require('./.././models/index');
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '24h' },
    (error, decoded) => {
      if (error) {
        return res.status(401).send({ error });
      }

      req.decoded = decoded;

      return User.findByPk(decoded.id).then((user) => {
        if (!user) {
          return res.status(401).send({ error: 'User does not exist' });
        }
        next();
      });
    },
  );
};

module.exports = authorize;
