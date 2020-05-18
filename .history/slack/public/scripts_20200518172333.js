const socket = io('http://localhost:9000'); //main namespace /

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit('messageToServer', { data: 'data from the client!' });
});

socket.on('joined', (msg) => {
  console.log(msg);
});

socket.on('nsList', (nsData) => {
  console.log('the list of namespaces has arrived');
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  socket.emit('newMessageToServer', { text: newMessage });
});
