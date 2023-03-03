const Sequelize = require("sequelize");

class Block extends Sequelize.Model {
  //
  static init(sequelize) {
    //
    return super.init(
      {
        //
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        mixHash: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        parentHash: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        transactions: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        transactionsRoot: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        //
        gasLimit: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        gasUsed: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        size: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        //
        difficulty: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        totalDifficulty: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        nonce: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        extraData: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        timestamp: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        //
        logsBloom: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        miner: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        receiptsRoot: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        stateRoot: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        sha3Uncles: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        uncles: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(db) {}
}

module.exports = Block;
