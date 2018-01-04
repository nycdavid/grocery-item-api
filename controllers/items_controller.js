const Item = require('../models/item.js');

const ItemsController = {
  index: async ctx => {
    let items = await Item.find();
    ctx.body = { items: items };
  },
  create: async ctx => {
    let reqBody = ctx.request.body;
    let item = new Item(reqBody.item);
    let saved;
    try {
      saved = await item.save()
    } catch(e) {
      console.log(e);
    }
    ctx.response.status = 201;
    ctx.body = saved;
  }
};

module.exports = ItemsController;
