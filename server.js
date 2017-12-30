const Koa = require('koa');
const _ = require('koa-route');
const app = new Koa();
const axios = require('axios');
const Port = 1337;

const PagesController = {
  index: ctx => {
    ctx.body = 'PagesController#index'
  }
}

// Routing
app.use(_.get('/home', PagesController.index));

app.listen(Port);
console.log(`Listening on port ${Port}...`)
