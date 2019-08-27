const chai = require('chai');

const expect = chai.expect;
const url = `http://localhost:3004/`;
const request = require('supertest')(url);

const tokenQuery = `{
    token(address: "0x4b258bf860db33ed1201181529453afd67d41d61") {
        name
        symbol
        totalSupply
        address
        decimals
    }
}`;

const transactionsQuery = `{
    transactions(address: "0x1077d535e587d03adf9da6698c7e14c4ab383dc6") {
        token {
            name
            symbol
            totalSupply
            address
            decimals
        }
        transactionHash
        fromAddress
        toAddress
        value
        logIndex
        blockTimestamp
        blockNumber
        blockHash
    }
}`;

const transactionQuery = `{
    transaction(transactionHash: "0xe6e1ec26db7d5c3e3016ce0a4c5765bdabaf796bbcae514ebb76a98bac5634f9") {
        transactionHash
        fromAddress
        toAddress
        value
        logIndex
        blockTimestamp
        blockNumber
        blockHash
        token {
            name
            symbol
            totalSupply
            address
            decimals
        }
    }
}`;

const tokenKeys = ['name', 'symbol', 'totalSupply', 'address', 'decimals'];
const transactionKeys = [
  'transactionHash',
  'fromAddress',
  'toAddress',
  'value',
  'logIndex',
  'blockTimestamp',
  'blockNumber',
  'blockHash',
  'token',
];

describe('GraphQL Server', () => {
  it('Returns token by address', done => {
    request
      .post('/graphql')
      .send({ query: tokenQuery })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.key('data');
        expect(res.body.data).to.have.key('token');
        expect(res.body.data.token).to.have.keys(...tokenKeys);
        done();
      });
  });

  it('Returns transactions by contract address', done => {
    request
      .post('/graphql')
      .send({ query: transactionsQuery })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.key('data');
        expect(res.body.data).to.have.key('transactions');
        expect(res.body.data.transactions).to.be.a('array');

        res.body.data.transactions.forEach(transaction => {
          expect(transaction).to.have.keys(...transactionKeys);
          expect(transaction.token).to.have.keys(...tokenKeys);
        });

        done();
      });
  });

  it('Transaction by txid', done => {
    request
      .post('/graphql')
      .send({ query: transactionQuery })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.key('data');
        expect(res.body.data).to.have.key('transaction');
        expect(res.body.data.transaction).to.have.keys(...transactionKeys);
        expect(res.body.data.transaction.token).to.have.keys(...tokenKeys);
        done();
      });
  });
});
