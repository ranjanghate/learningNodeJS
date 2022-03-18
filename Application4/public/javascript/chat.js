const socket = io(); // this io function is provided by socket.io.js file
// whenever it is called it creates a new connection

// Elements
const messageForm = document.querySelector('#message-box');
const messageButton = messageForm.querySelector('#message-button');
const messageInput = messageForm.querySelector('#message-input');
const locationButton = document.querySelector('#send-location');
const messages = document.querySelector('#messages');
const sidebar = document.querySelector('#sidebar');

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Query Params
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('message', (message) => {
  // event listener for event countUpdate which is defined on server side
  const html = mustache.render(messageTemplate, { 
    message: message.text, 
    createdAt: moment(message.createdAt).format('h:mm: A'),
    username: message.username
  });
  // final HTML which will be rendering in browser
  messages.insertAdjacentHTML('beforeend', html);

  messages.scrollTop = messages.scrollHeight;
  //Autoscroll
});

socket.on('locationMessage', (url) => {
  // event listener for event countUpdate which is defined on server side
  const html = mustache.render(locationMessageTemplate, { 
    location_url: url.url, 
    createdAt: moment(url.createdAt).format('h:mm: A'),
    username: url.username 
  });
  // final HTML which will be rendering in browser
  messages.insertAdjacentHTML('beforeend', html);

  messages.scrollTop = messages.scrollHeight;
  //Autoscroll
});

document.querySelector('#message-box').addEventListener('submit', (e) => {
  e.preventDefault();

  messageButton.setAttribute('disabled', 'disabled');

  let message = e.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    messageButton.removeAttribute('disabled');
    messageInput.value = '';
    messageInput.focus();

    if(error) {
      return console.log(error)
    }
    console.log('Message Delivered');
  }); 
  // this will create a event on client side which will be listen on server side
});

document.querySelector('#send-location').addEventListener('click', (e) => {
  e.preventDefault();
  locationButton.setAttribute('disabled', 'disabled');

  if(!navigator.geolocation) {
    return alert('Geolocation is disabled');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    coordinates = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    socket.emit('sendLocation', coordinates, () => {
      locationButton.removeAttribute('disabled');
      console.log('Location shared!');
    });
  });
  // let message = e.target.elements.message.value;
  // socket.emit('sendMessage', message); // this will create a event on client side which will be listen on server side
});

socket.on('roomData', (data) => {
  const html = mustache.render(sidebarTemplate, {
    room: data.room,
    users: data.users
  })
  sidebar.innerHTML = html;
});

socket.emit('join', { username, room }, (error) => {
  if(error) {
    alert(error);
    location.href = '/';
  }
});
