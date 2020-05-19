function joinRoom(roomName) {
  nsSocket.emit('joinRoom', roomName, (newNumberOfMembers) => {
    document.querySelector(
      '.curr-room-num-users'
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span
          >`;
  });
  nsSocket.on('historyCatchUp', (history) => {
    const messagesUl = document.querySelector('#messages');
    messagesUl.innerHTML = '';
    history.forEach((message) => {
      const newMessage = buildHTML(message);
      const currentMessages = messagesUl.innerHTML;
      messagesUl.innerHTML = currentMessages + newMessage;
    });
    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });
  nsSocket.on('updateMembers', (numMembers) => {
    document.querySelector(
      '.curr-room-num-users'
    ).innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span
          >`;
    document.querySelector('.curr-room-text').innerText = `${roomName}`;
  });

  let searchBox = document.querySelector('#search-box');
  searchBox.addEventListener('input', (event) => {
    let messages = Array.from(document.getElementsByClassName('message-text'));
    messages.forEach((message) => {
      if (message.innerText.indexOf(event.target.value) === -1) {
        message.style.display = 'none';
      } else {
        message.style.display = 'block';
      }
    });
  });
}
