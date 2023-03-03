const dot = require("dotenv").config();

const config = {
  dev: {
    password: process.env.DATABASE_PASSWORD,
    database: "toy_ether_scan",
    host: "127.0.0.1",
    username: "root",
    dialect: "mysql",
    logging: false,
  },
};

module.exports = config;
