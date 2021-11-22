const pathEnv = require('path').resolve(process.cwd(), `env/.env.${process.env.NODE_ENV}`);
module.exports = pathEnv;