const Koa = require('koa');
const _ = require('koa-route');
const App = new Koa();
const mongooseInit = require('./config/mongoose.js')

// Controllers
const ItemsController = require('./controllers/items_controller.js');

// Routing
App.use(_.get('/items', ItemsController.index));
App.use(_.post('/items', ItemsController.create));

module.exports = App;
