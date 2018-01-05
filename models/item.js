const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'cannot be blank']
  },
  price: Number
});

const Item = Mongoose.model('Item', ItemSchema);

module.exports = Item;
