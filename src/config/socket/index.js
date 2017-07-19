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
  checkSocket,       // 检查 是否 正在与服务器 通讯
  socketConfig,      // 配置 socket 初始化
  leaveSocket,       // 用户离开
};
