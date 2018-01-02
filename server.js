const Koa = require('koa');
const _ = require('koa-route');
const app = new Koa();
const axios = require('axios');
const Port = 1337;
const ItemsController = require('./controllers/items_controller.js');
const mongooseInit = require('./config/mongoose.js')

const PagesController = {
  home: ctx => {
    ctx.body = 'PagesController#index'
  }
}

// Routing
app.use(_.get('/', PagesController.home));
app.use(_.get('/items', ItemsController.index));
app.use(_.post('/items', ItemsController.create));

app.listen(Port);
console.log(`Listening on port ${Port}...`)
