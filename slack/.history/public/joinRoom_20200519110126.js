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
}
