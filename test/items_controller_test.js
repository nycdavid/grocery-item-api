const expect = require('chai').expect;
const App = require('../app.js')
const request = require('supertest');
const testHelper = require('./test_helper.js');
const Mongoose = require('mongoose');
const Item = require('../models/item.js')

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
  let itemPayload;
  beforeEach(() => {
    itemPayload = { name: 'Water', price: 5.19 };
  });

  it('creates the item', async () => {
    const res = await request(server).post('/items')
      .send({ item: itemPayload });

    expect(res.status).to.equal(201);
    expect(res.body.item.name).to.equal('Water');
  });

  it('rejects an item if it\'s missing an attribute', async() => {
    itemPayload.name = '';
    const res = await request(server).post('/items')
      .send({ item: itemPayload });

    expect(res.status).to.equal(400);
    expect(res.body.errors[0]).to.include({ attribute: 'name' });
  });
});

describe('DELETE /items/:id', () => {
  it('deletes the item', async () => {
    let testItem = { name: 'Coconut Oil', price: 5.99 };
    let item = new Item(testItem);
    try {
      await item.save();
    } catch(e) {
      throw e;
    }

    let res = await request(server).delete(`/items/${item.id}`);
    let found = await Item.findById(item.id);

    expect(res.status).to.equal(202);
    expect(found).to.equal(null);
  });

  it('returns a 404 for an invalid id', async() => {
    const res = await request(server).delete('/items/507f1f77bcf86cd799439011')

    expect(res.status).to.equal(404);
  });
});

describe('PUT /items/:id', () => {
  it('updates the item', async () => {
    let testItem = { name: 'Coconut Oil', price: 5.99 };
    let item = new Item(testItem);
    try {
      await item.save();
    } catch(e) {
      throw e;
    }

    let res = await request(server).put(`/items/${item.id}`)
      .send({ item: { name: 'Coconut Oil', price: 7.99 } });
    let found = await Item.findById(item.id);

    expect(res.status).to.equal(201);
    expect(res.body.item).to.include.keys('name', 'price');
    expect(found.price).to.equal(7.99);
  });
});
