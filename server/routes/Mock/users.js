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

  router.post('/users/Login', function (req, res, next) {
    let status = false
    let data = req.body
    if (typeof req.session.user !== 'undefined') {
      req.conso += '用户身份验证'
      res.send({status: 3, data: req.session.user})
      status = true
      next()
    }
    else if (typeof data.code !== 'undefined' && data.code != 0 && data.code != 1) {
      req.conso += '用户尝试使用 code 登录...\n'
      for (item of Users) {
        if (item.code === data.code) {
          req.conso += item.nickname + ' 使用 code 登录！\n'
          req.session.user = item
          res.send({status: 4, data: item})
          status = true
          return next()
        }
      }
      req.conso += consoleOutPut + '无效的 code ！\n'
      res.send({status: 10003})
      return next()
    }
    else {
      if (typeof data.username !== 'undefined') {
        req.conso += '用户登录'
        for (item of Users) {
          if (item.username === data.username) {
            if (item.password === data.password) {
              req.session.user = item
              res.send({status: 1, data: item})
              return next()
            } else {
              res.send({status: 10000})
              return next()
            }
          }
        }
        res.send({status: 10001})
        return next()
      } else {
        res.send({status: 10003})
        next()
      }
    }
  })

  router.post('/users/logout', function (req, res, next) {
    req.conso += '用户退出'
    req.session.destroy()
    res.send({status: 2})
    next()
  })
}
