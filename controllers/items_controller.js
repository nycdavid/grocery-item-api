const Item = require('../models/item.js');

const ItemsController = {
  index: async ctx => {
    let items = await Item.find();
    ctx.body = { items: items };
  },
  create: ctx => {
    let body = [];
    ctx.req.on('data', chunk => {
      body.push(chunk);
    }).on('end', async () => {
      let reqBody = JSON.parse(Buffer.concat(body).toString());
      let item = new Item({ name: reqBody.item.name, price: reqBody.item.price });
      item.save();
      ctx.body = item;
      // try {
      //   let i = await item.save();
      // } catch (e) {
      //   console.log(e);
      // }
    });
  }
};

module.exports = ItemsController;
