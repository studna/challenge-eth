const transactions = require('./transactions');
const token = require('./token');
const transaction = require('./transaction');

module.exports = {
  Query: {
    transactions,
    token,
    transaction,
  },

  Transaction: {
    token: (parent, args, context) =>
      token(parent, { address: parent.tokenAddress }, context),
  },
};
