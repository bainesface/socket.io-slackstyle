const socket = io('http://localhost:9000'); //main namespace /
const socket2 = io('http://localhost:9000/admin'); //admin namespace /admin

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit('messageToServer', { data: 'data from the client!' });
});

socket2.on('welcome', (msgFromServer) => {
  console.log(msgFromServer);
});

socket.on('joined', (msg) => {
  console.log(msg);
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  socket.emit('newMessageToServer', { text: newMessage });
});
