const mongooseInit = require('./config/mongoose.js');
const App = require('./app.js');
const Port = 1337;

App.listen(Port);
console.log(`Listening on port ${Port}...`)
