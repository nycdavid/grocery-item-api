const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ItemSchema = new Schema({
  name: String
});

const Item = Mongoose.model('Item', ItemSchema);

module.exports = Item;
