function joinNs(endpoint) {
  const nsSocket = io('http://localhost:9000/wiki');
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
  });
}
