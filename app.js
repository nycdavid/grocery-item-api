const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const _ = require('koa-route');
const App = new Koa();
const mongooseInit = require('./config/mongoose.js')

// Middleware
App.use(bodyParser());

// Controllers
const ItemsController = require('./controllers/items_controller.js');

// Routing
App.use(_.get('/items', ItemsController.index));
App.use(_.post('/items', ItemsController.create));
App.use(_.delete('/items/:id', ItemsController.delete));

module.exports = App;
