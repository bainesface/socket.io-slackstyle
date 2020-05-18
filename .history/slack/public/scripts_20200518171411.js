const socket = io('http://localhost:9000'); //main namespace /
const socket2 = io('http://localhost:9000/wiki'); //admin namespace /wiki
const socket3 = io('http://localhost:9000/mozilla'); //admin namespace /mozilla
const socket4 = io('http://localhost:9000/linux'); //admin namespace /linux

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit('messageToServer', { data: 'data from the client!' });
});

socket.on('joined', (msg) => {
  console.log(msg);
});

socket2.on('welcome', (msgFromServer) => {
  console.log(msgFromServer);
});
