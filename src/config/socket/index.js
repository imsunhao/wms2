import App from '../../main';

const io = require('io');
let socket = '';

function checkSocket (nickname) {
  if (socket === '') {
    socket = io.connect('http://' + App.http.ip + ':13000/');
    socket.on('connect', function () {
      console.log(nickname);
      socket.emit('join', nickname);
    });
  } else {
    socket.emit('checkUser', nickname);
  }
}
function leaveSocket () {
  socket.emit('leave', App.user.nickname);
}

function socketConfig () {
  window.onbeforeunload = function () {
    leaveSocket();
  };
}

export {
  io,
  socket,
  checkSocket,
  socketConfig,
  leaveSocket,
};
