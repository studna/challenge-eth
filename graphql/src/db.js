const Sequelize = require('sequelize');
const createTokensModel = require('./models/tokens');
const createTokenTransfersModel = require('./models/tokenTransfers');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgresql',
});

const tokensModel = createTokensModel(sequelize);
const tokenTransfersModel = createTokenTransfersModel(sequelize);

module.exports = {
  tokensModel,
  tokenTransfersModel,
  sequelize,
};
