const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/test');
Mongoose.Promise = global.Promise;
