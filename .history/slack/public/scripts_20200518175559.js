const socket = io('http://localhost:9000'); //main namespace /

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit('messageToServer', { data: 'data from the client!' });
});

socket.on('nsList', (nsData) => {
  let namespacesDiv = document.querySelector('.namespaces');
  namespacesDiv.innerHTML = '';
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"/></div>`;
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(
    (element) => {
      element.addEventListener('click', (e) => {
        const nsEndpoint = element.getAttribute('ns');
        console.log(`${nsEndpoint} I should go to now`);
      });
    }
  );
  const nsSocket = io('http://localhost:9000/wiki');
  nsSocket.on('nsRoomLoad', (nsRooms) => {
    //console.log(nsRooms);
    const roomList = document.querySelector('.room-list');
    roomList.innterHTML = '';
    nsRooms.forEach((room) => {
      roomList.innerHTML += `<li onclick="joinRoom(1,2)"><span class="glyphicon glyphicon-lock"></span>Main Room</li>`;
    });
  });
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  socket.emit('newMessageToServer', { text: newMessage });
});
