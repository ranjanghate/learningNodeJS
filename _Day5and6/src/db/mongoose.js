const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {});
// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
// Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.
