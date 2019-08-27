const Sequelize = require('sequelize');

class Tokens extends Sequelize.Model {}

module.exports = sequelize => {
  Tokens.init(
    {
      address: {
        type: Sequelize.CHAR(42),
        primaryKey: true,
      },
      symbol: {
        type: Sequelize.TEXT,
      },
      name: {
        type: Sequelize.TEXT,
      },
      decimals: {
        type: Sequelize.SMALLINT,
      },
      totalSupply: {
        type: Sequelize.NUMBER,
      },
    },
    {
      sequelize,
      tableName: 'tokens',
      timestamps: false,
      underscored: true,
    },
  );

  return Tokens;
};
