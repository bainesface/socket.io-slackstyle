const express = require('express');
const app = express();
const socketio = require('socket.io');
let namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  socket.emit('nsList', nsData);
});

//loop through a namespace and listen to a connection
namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (nsSocket) => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    //a socket has connected to one of our chatgroup namespaces
    //send that ns group info back
    nsSocket.emit('nsRoomLoad', namespaces[0].rooms);
    nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback) => {
      nsSocket.join(roomToJoin);
      io.of('/wiki')
        .in(roomToJoin)
        .clients((error, clients) => {
          console.log(clients.length);
          numberOfUsersCallback(clients.length);
        });
    });
    nsSocket.on('newMessageToServer', (msg) => {
      const fullMsg = {
        text: msg,
        time: Date.now(),
        username: 'bainesface',
        avatar: 'https://via.placeholder.com/30',
      };
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      io.of('/wiki').to(roomTitle).emit('messageToClients', fullMsg);
    });
  });
});
