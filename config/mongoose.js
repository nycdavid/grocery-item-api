const Mongoose = require('mongoose');
const DB_STRINGS = {
  test: 'localhost/grocery-item-api-test',
  development: 'localhost/grocery-item-api-development'
};
const env = process.env.NODE_ENV

Mongoose.connect(`mongodb://${DB_STRINGS[env]}`);
Mongoose.Promise = global.Promise;
