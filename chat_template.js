
  var wsUri = "ws://{{req.headers.host}}/ws/chat";
  var ws = new WebSocket(wsUri);

  function createSystemMessage(message) {
    var message = document.createTextNode(message);

    var messageBox = document.createElement('p');
    messageBox.className = 'system';

    messageBox.appendChild(message);

    var chat = document.getElementById('chat_box');
    chat.appendChild(messageBox);
  }

  function createUserMessage(user, message) {
    var user = document.createTextNode(user + ': ');

    var userBox = document.createElement('span');
    userBox.className = 'username';
    userBox.appendChild(user);

    var message = document.createTextNode(message);

    var messageBox = document.createElement('p');
    messageBox.appendChild(userBox);
    messageBox.appendChild(message);

    var chat = document.getElementById('chat_box');
    chat.appendChild(messageBox);
  }

  ws.onopen = function(ev) {
    createSystemMessage('[Connected]');
  };

  ws.onclose = function(ev) {
    createSystemMessage('[Disconnected]');
  }

  ws.onmessage = function(ev) {
    var payload = JSON.parse(ev.data);
    createUserMessage(payload.user, payload.message);

    var chat = document.getElementById('chat_box');
    chat.scrollTop = chat.scrollHeight;
  }

  function sendMessage() {
    var user = document.getElementById('user');
    var message = document.getElementById('message');

    var payload = {
      message: message.value,
      user: user.value,
      ts: (new Date()).getTime()
    };

    ws.send(JSON.stringify(payload));
    message.value = "";
  };