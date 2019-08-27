const { ApolloServer, gql } = require('apollo-server');
const db = require('./db');
const resolvers = require('./resolvers');

const typeDefs = gql`
  type Token {
    address: String!
    symbol: String!
    name: String!
    totalSupply: Float!
    decimals: Int!
  }

  type Transaction {
    token: Token!
    fromAddress: String!
    toAddress: String!
    value: Float!
    transactionHash: String!
    logIndex: String!
    blockTimestamp: String!
    blockNumber: String!
    blockHash: String!
  }

  type Query {
    transaction(transactionHash: ID!): Transaction
    transactions(address: ID!): [Transaction]
    token(address: ID!): Token
  }
`;

const context = async () => {
  await db.sequelize.authenticate();
  return db;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
