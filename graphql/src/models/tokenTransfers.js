const Sequelize = require('sequelize');

class TokenTransfers extends Sequelize.Model {}

module.exports = sequelize => {
  TokenTransfers.init(
    {
      tokenAddress: {
        type: Sequelize.CHAR(42),
      },
      fromAddress: {
        type: Sequelize.CHAR(42),
      },
      toAddress: {
        type: Sequelize.CHAR(42),
      },
      value: {
        type: Sequelize.FLOAT,
      },
      transactionHash: {
        type: Sequelize.CHAR(66),
      },
      logIndex: {
        type: Sequelize.BIGINT,
      },
      blockTimestamp: {
        type: Sequelize.DATE,
      },
      blockNumber: {
        type: Sequelize.BIGINT,
      },
      blockHash: {
        type: Sequelize.CHAR(66),
      },
    },
    {
      sequelize,
      tableName: 'token_transfers',
      timestamps: false,
      indexes: [
        {
          fields: ['transactionHash'],
        },
        {
          fields: ['fromAddress'],
        },
        {
          fields: ['toAddress'],
        },
      ],
      underscored: true,
    },
  );

  TokenTransfers.removeAttribute('id');

  return TokenTransfers;
};
