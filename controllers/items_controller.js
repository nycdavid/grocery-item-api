const Item = require('../models/item.js');

const ItemsController = {
  index: async ctx => {
    let items = await Item.find();
    ctx.body = JSON.stringify(items);
  },
  create: ctx => {
    ctx.body = "ItemsController#create"
  }
};

module.exports = ItemsController;
