function joinNs(endpoint) {
  const nsSocket = io(`http://localhost:9000${endpoint}`);
  nsSocket.on('nsRoomLoad', (nsRooms) => {
    //console.log(nsRooms);
    const roomList = document.querySelector('.room-list');
    roomList.innterHTML = '';
    nsRooms.forEach((room) => {
      let glyph;
      if (room.privateRoom) {
        glyph = 'lock';
      } else {
        glyph = 'globe';
      }
      roomList.innerHTML += `<li class='room'><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
    });
    let roomNodes = document.getElementsByClassName('room');
    Array.from(roomNodes).forEach((element) => {
      element.addEventListener('click', (event) => {
        console.log('someone clicked on', event.target.innerText);
      });
    });
    const topRoom = document.querySelector('.room');
  });

  nsSocket.on('messageFromClients', (msg) => {
    console.log(msg);
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
  });

  document
    .querySelector('.message-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const newMessage = document.querySelector('#user-message').value;
      socket.emit('newMessageToServer', { text: newMessage });
    });
}
