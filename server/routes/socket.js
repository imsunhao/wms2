module.exports=function (socketIO) {
  const roomInfo = {};
  socketIO.on('connection',function (socket) {
    // 获取请求建立socket连接的url
    let roomID = 1;   // 获取房间ID
    let user = '';

    socket.on('join', function (userName) {
      user = userName;
      // 将用户昵称加入房间名单中
      if (!roomInfo[roomID]) {
        roomInfo[roomID] = [];
      }
      roomInfo[roomID].push(user);

      socket.join(roomID);    // 加入房间
      // 通知房间内人员
      socketIO.to(roomID).emit('sys', user + '加入了房间', roomInfo[roomID]);
      console.log(user + '加入了' + roomID);
    });

    socket.on('leave', function () {
      socket.emit('disconnect');
      console.log(user + '退出了' + roomID);
    });

    socket.on('disconnect', function () {
      // 从房间名单中移除
      let index = roomInfo[roomID].indexOf(user);
      if (index !== -1) {
        roomInfo[roomID].splice(index, 1);
      }

      socket.leave(roomID);    // 退出房间
      socketIO.to(roomID).emit('sys', user + '退出了房间', roomInfo[roomID]);
    });

    // 接收用户消息,发送相应的房间
    socket.on('message', function (msg) {
      // 验证如果用户不在房间内则不给发送
      if (roomInfo[roomID].indexOf(user) === -1) {
        return false;
      }
      socketIO.to(roomID).emit('msg', user, msg);
    });

    // 接收用户消息,发送相应的房间
    socket.on('checkUser', function (username) {
      // 验证如果用户不在房间内则不给发送
      if(user!==username){
        let string =user+'更换昵称,';
        user=username;
        string +=user + '加入了房间';
        // 将用户昵称加入房间名单中
        if (!roomInfo[roomID]) {
          roomInfo[roomID] = [];
        }
        roomInfo[roomID].push(user);

        socket.join(roomID);    // 加入房间
        // 通知房间内人员
        socketIO.to(roomID).emit('sys',string, roomInfo[roomID]);
        console.log(string + roomID);
      }else{
        console.log(username + '重新加入了房间' + roomID);
        socketIO.to(roomID).emit('sys', username + '重新加入了房间', roomInfo[roomID]);
      }
    });
  });
}

