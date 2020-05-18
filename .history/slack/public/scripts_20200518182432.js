const socket = io('http://localhost:9000'); //main namespace /

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
});

document.querySelector('.message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  socket.emit('newMessageToServer', { text: newMessage });
});

socket.on('messageFromClients', (msg) => {
  console.log(msg);
  document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
});
