const express = require('express');
require('./db/mongoose.js'); // connecting to mongo database

const userRouter = require('./controllers/user_controller.js')
const userSessionRouter = require('./controllers/user_session_controller.js')
const taskRouter = require('./controllers/task_controller.js')

const app = express();

app.use(express.json()); // automatically pasre incoming JSON to an object
app.use(userRouter);
app.use(userSessionRouter);
app.use(taskRouter);

module.exports = app
