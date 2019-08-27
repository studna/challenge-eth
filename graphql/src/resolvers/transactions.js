const Sequelize = require('sequelize');

module.exports = async (parent, args, { tokenTransfersModel }) => {
  const { address } = args;

  const transactions = await tokenTransfersModel.findAll({
    where: {
      [Sequelize.Op.or]: [{ toAddress: address }, { fromAddress: address }],
    },
    limit: 500,
  });

  return transactions;
};
