module.exports = function (router) {
  const Users = [
    {
      username: 'imsunhao',
      nickname: '孙颢',
      role: '超级管理员',
      code: 'asgxcvb!dsdg12sdaasdxx1',
      password: '123456'
    },
    {
      username: 'zhangxing',
      nickname: '张星',
      role: '收货调度',
      code: 'asgxcvb!dsdg12sdaasdxx2',
      password: '123456'
    },
    {
      username: 'wujinfei',
      nickname: '吴金霏',
      role: '出库调度',
      code: 'asgxcvb!dsdg12sdaasdxx3',
      password: '123456'
    },
    {
      username: 'zhaorenren',
      nickname: '赵忍忍',
      role: '操作人员',
      code: 'asgxcvb!dsdg12sdaasdxx4',
      password: '123456'
    },
    {
      username: 'hukai',
      nickname: '胡凯',
      role: '操作人员',
      code: 'asgxcvb!dsdg12sdaasdxx5',
      password: '123456'
    },
  ]
  const consoleOutPut = '\t---->\t'

  function userFail (req) {
    if (typeof req.session.frequency === 'undefined') {
      req.session.frequency = 1
    } else {
      switch (++req.session.frequency) {
        case 1:
          break
        case 2:
          break
        default:
          req.session.firstTime = new Date()
          req.session.fail = true
          break
      }
    }
    req.conso += consoleOutPut + `当前失败次数:${req.session.frequency}\n`
    req.session.save();
  }

  router.post('/users/Login', function (req, res, next) {
    let data = req.body
    if (typeof req.session.user !== 'undefined') {
      req.conso += consoleOutPut + '用户身份验证\n'
      req.conso += consoleOutPut + req.session.user.nickname + '\t用户身份验证通过\n'
      res.send({status: 3, data: req.session.user})
      return next()
    }
    else if (typeof data.code !== 'undefined' && data.code != 0 && data.code != 1) {
      req.conso += consoleOutPut + '用户尝试使用 code 登录...\n'
      for (item of Users) {
        if (item.code === data.code) {
          req.conso += consoleOutPut + item.nickname + ' 使用 code 登录！\n'
          req.session.user = item
          req.session.save();
          res.send({status: 4, data: item})
          return next()
        }
      }
      req.conso += consoleOutPut + '无效的 code ！\n'
      userFail(req)
      res.send({status: 10003})
      return next()
    }
    else {
      if (typeof data.username !== 'undefined') {
        req.conso += consoleOutPut + '用户登录\n'
        for (item of Users) {
          if (item.username === data.username) {
            if (item.password === data.password) {
              req.session.user = item
              req.session.save();
              res.send({status: 1, data: item})
              req.conso += consoleOutPut + '用户有效\n'
              req.conso += consoleOutPut + item.nickname + ' 使用 账户与密码 登录！\n'
              return next()
            } else {
              res.send({status: 10000})
              req.conso += consoleOutPut + '密码无效\n'
              req.conso += consoleOutPut + item.nickname + ' 使用 密码验证 失败！\n'
              userFail(req)
              return next()
            }
          }
        }
        res.send({status: 10001})
        req.conso += consoleOutPut + data.username + '\t无此用户\n'
        userFail(req)
        return next()
      } else {
        res.send({status: 10003})
        req.conso += consoleOutPut + `用户身份验证失败\n`
        return next()
      }
    }
  })

  router.post('/users/logout', function (req, res, next) {
    req.conso += consoleOutPut + req.session.user.nickname + '\t用户退出\n'
    req.session.destroy()
    res.send({status: 2})
    return next()
  })
}
