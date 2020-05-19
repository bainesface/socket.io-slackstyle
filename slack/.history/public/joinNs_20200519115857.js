function joinNs(endpoint) {
  nsSocket = io(`http://localhost:9000${endpoint}`);
  nsSocket.on('nsRoomLoad', (nsRooms) => {
    console.log(nsRooms, 'nsRooms');
    const roomList = document.querySelector('.room-list');
    roomList.innterHTML = '';
    nsRooms.forEach((room) => {
      console.log(room, 'room');
      let glyph;
      if (room.privateRoom) {
        glyph = 'lock';
      } else {
        glyph = 'globe';
      }
      roomList.innerHTML += `<li class='room'><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
    });
    let roomNodes = document.getElementsByClassName('room');
    console.log(roomNodes, 'roomNodes');
    Array.from(roomNodes).forEach((element) => {
      element.addEventListener('click', (event) => {
        console.log('someone clicked on', event.target.innerText);
        joinRoom(event.target.innerText);
      });
    });
    const topRoom = document.querySelector('.room');
    const topRoomName = topRoom.innerText;
    joinRoom(topRoomName);
  });

  nsSocket.on('messageToClients', (msg) => {
    console.log(msg);
    const newMsg = buildHTML(msg);
    document.querySelector('#messages').innerHTML += newMsg;
  });

  document
    .querySelector('.message-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const newMessage = document.querySelector('#user-message').value;
      nsSocket.emit('newMessageToServer', { text: newMessage });
    });
}

function buildHTML(msg) {
  const convertedDate = new Date(msg.time).toLocaleString();
  const newHTML = `<li>
          <div class="user-image">
            <img src="${msg.avatar}" />
          </div>
          <div class="user-message">
            <div class="user-name-time">${msg.username}<span>${convertedDate}</span></div>
            <div class="message-text">${msg.text}</div>
          </div>
        </li>
`;
  return newHTML;
}
