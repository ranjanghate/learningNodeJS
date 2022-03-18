const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const messageFilter = require('bad-words');
const filter = new messageFilter();
const { generateMessage, generateLocationMessage } = require('./utils/message.js');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/user.js');

const app = express();
const server = http.createServer(app); 
// create a new web server for our express application
// it is automatically done in express library

const io = socketio(server);
// assigning server to socket io

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

// socket is an object which contain info about the connection
io.on('connection', (socket) => {
  console.log('New web socket connection');
  // socket.emit('message', generateMessage('Welcome!')); 
  // // this triggers an event for a particular client which is connected to server
  
  // socket.broadcast.emit('message', generateMessage('A new user has joined!')); 
  // // this trigers event for all clients expect the current client

  socket.on('join', ({ username, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, username, room });
    // socket.id returns an unique ID to that connection 

    if(error) {
      return callback(error);
    }

    socket.join(user.room);
    // join method is only available for server side

    socket.emit('message', generateMessage('Welcome!', 'Admin'));     
    socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`, 'Admin')); 
    // this trigers event for all clients available in the room expect the current client
    
    io.to(user.room).emit('roomData', ({ room: user.room, users: getUsersInRoom(user.room) }));

    // socket.emit, io.emit, socket.broadcast.emit GLOBAL EVENT LISTENER
    // io.to.emit, socket.broadcast.to.emit ROOM LEVEL EVENT LISTENER
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    // socket.emit('message', message); // this triggers an event for a particular client

    const user = getUser(socket.id);

    if(filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }
    io.to(user.room).emit('message', generateMessage(message, user.username)); 
    // this triggers an event for all client
    callback();
  });

  socket.on('sendLocation', (coordinates, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`, user.username));
    callback();
  }) 

  socket.on('disconnect', () => { 
   const user = removeUser(socket.id);
    // we dont have to add listner for 'disconnected' event manually, 
    // it is automatically handled socket.io.js library added in client side
    if (user) {
      io.to(user.room).emit('message', generateMessage(`${user.username} has left!`, 'Admin'));
      io.to(user.room).emit('roomData', ({ room: user.room, users: getUsersInRoom(user.room) }));
    }

  });

});
// io.on() listening for a event to occur

server.listen(port, () => {
  console.log('Server Started');
})
