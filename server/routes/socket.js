const {socketLog} = require('../config/dev')

module.exports = function (socketIO) {
  const roomInfo = {}
  const conso = 'socketIO:\t'
  socketIO.on('connection', function (socket) {
    // 获取请求建立socket连接的url
    let roomID = 1   // 获取房间ID
    let user = ''

    socket.on('join', function (userName) {
      user = userName
      // 将用户昵称加入房间名单中
      if (!roomInfo[roomID]) {
        roomInfo[roomID] = []
      }
      roomInfo[roomID].push(user)

      socket.join(roomID)    // 加入房间
      // 通知房间内人员
      socketIO.to(roomID).emit('\tsys\t', user + '\t加入了房间\t', roomInfo[roomID])
      socketLog(conso + user + '\t加入了\t' + roomID + '\t当前房间人数为：\t' + roomInfo[roomID].length)
    })

    socket.on('leave', function () {
      socket.emit('disconnect')
      socketLog(conso + user + '\t退出了\t' + roomID+ '\t当前房间人数为：\t' + roomInfo[roomID].length)
    })

    socket.on('disconnect', function () {
      // 从房间名单中移除
      let index = roomInfo[roomID].indexOf(user)
      if (index !== -1) {
        roomInfo[roomID].splice(index, 1)
      }

      socket.leave(roomID)    // 退出房间
      socketIO.to(roomID).emit('\tsys\t', user + '\t退出了房间\t', roomInfo[roomID])
    })

    // 接收用户消息,发送相应的房间
    socket.on('message', function (msg) {
      // 验证如果用户不在房间内则不给发送
      if (roomInfo[roomID].indexOf(user) === -1) {
        return false
      }
      socketIO.to(roomID).emit('msg', user, msg)
    })

    // 接收用户消息,发送相应的房间
    socket.on('checkUser', function (username) {
      // 验证如果用户不在房间内则不给发送
      if (user !== username) {
        let string = user + '\t更换昵称,\t'
        user = username
        string += user + '\t加入了房间\t'
        // 将用户昵称加入房间名单中
        if (!roomInfo[roomID]) {
          roomInfo[roomID] = []
        }
        roomInfo[roomID].push(user)

        socket.join(roomID)    // 加入房间
        // 通知房间内人员
        socketIO.to(roomID).emit('\tsys\t', string, roomInfo[roomID])
        socketLog(conso + string + roomID)
      } else {
        socketLog(conso + username + '\t重新加入了房间\t' + roomID+ '\t当前房间人数为：\t' + roomInfo[roomID].length)
        socketIO.to(roomID).emit('\tsys\t', username + '\t重新加入了房间\t', roomInfo[roomID])
      }
    })
  })
}

