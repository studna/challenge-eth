const Sequelize = require('sequelize');

module.exports = async (parent, args, { tokenTransfersModel }) => {
  const { transactionHash } = args;

  const transaction = await tokenTransfersModel.findOne({
    where: {
      transactionHash,
    },
  });

  return transaction;
};
