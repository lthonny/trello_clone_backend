console.log(
//     process.env.POSTGRES_USER,
//     // process.env.POSTGRES_
    process.env.POSTGRES_DIALECT
);
module.exports = {
  development: {
    username: "postgres",
    password: "secret",
    database: "trello",
    host: '127.0.0.1',
    port: 5431,
    dialect: "postgres",
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: '127.0.0.1',
    port: process.env.POSTGRES_PORT,
    dialect: process.env.POSTGRES_DIALECT,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: '127.0.0.1',
    port: process.env.POSTGRES_PORT,
    dialect: process.env.POSTGRES_DIALECT,
  },
};
