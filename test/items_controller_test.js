const expect = require('chai').expect;
const App = require('../app.js')
const request = require('supertest');
const testHelper = require('./test_helper.js');
const Mongoose = require('mongoose');

let server;

beforeEach(() => {
  server = App.listen();
});

afterEach(() => {
  server.close();
  Mongoose.connection.db.dropDatabase();
});

describe('GET /items', () => {
  it('returns all items', async () => {
    const res = await request(server).get('/items');

    expect(res.status).to.equal(200);
    expect(res.body.items).to.be.empty;
  });
});

describe('POST /items', () => {
  it('creates the object', async() => {
    let itemPayload = { name: 'Water', price: 5.19 };
    const res = await request(server).post('/items')
      .send({ item: itemPayload });

    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal('Water');
  });
});
