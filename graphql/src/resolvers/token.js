const Sequelize = require('sequelize');

module.exports = async (parent, args, { tokensModel }) => {
  const { address } = args;

  const token = await tokensModel.findOne({
    where: { address },
  });

  return token;
};
