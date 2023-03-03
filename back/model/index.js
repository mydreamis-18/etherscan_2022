const Sequelize = require("sequelize");

const config = require("../config");
const { database, username, password } = config.dev;

const sequelize = new Sequelize(database, username, password, config.dev);

const db = new Object();
const Block = require("./block");

db.sequelize = sequelize;
db.Block = Block;

Block.init(sequelize);

module.exports = { sequelize, Block };
