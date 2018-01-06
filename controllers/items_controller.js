const Item = require('../models/item.js');
const ErrorSerializer = require('../lib/error_serializer.js');

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
      const errors = new ErrorSerializer(e);
      ctx.response.status = errors.statusCode();
      return ctx.body = { errors: errors.body };
    }
    ctx.response.status = 201;
    ctx.body = { item: saved };
  },
  delete: async (ctx, id) => {
    let item = await Item.findById(id);
    if (item === null){
      return ctx.response.status = 404;
    }
    try {
      await item.remove()
    } catch(e) {
      ctx.response.status = 500;
    }
    ctx.response.status = 202;
  },
  update: async (ctx, id) => {
    let reqBody = ctx.request.body;
    try {
      await Item.findByIdAndUpdate(id, reqBody.item);
    } catch(e) {
      ctx.response.status = 500;
    }
    let updatedItem = await Item.findById(id);
    ctx.response.status = 201;
    ctx.body = { item: updatedItem };
  }
};

module.exports = ItemsController;
