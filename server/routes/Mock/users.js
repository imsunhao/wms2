module.exports = function (router) {
  const Users = [
    {
      username: 'imsunhao',
      nickname: '孙颢',
      role:'超级管理员',
      password: '123456'
    },
    {
      username: 'zhangxing',
      nickname: '张星',
      role:'收货调度',
      password: '123456'
    },
    {
      username: 'wujinfei',
      nickname: '吴金霏',
      role:'出库调度',
      password: '123456'
    },
    {
      username: 'zhaorenren',
      nickname: '赵忍忍',
      role:'操作人员',
      password: '123456'
    },
    {
      username: 'hukai',
      nickname: '胡凯',
      role:'操作人员',
      password: '123456'
    },
  ]

  router.post('/users/Login', function (req, res, next) {
    console.log('用户登录')
    let data = req.body
    let status = false
    Users.forEach(function (item, index, array) {
      if (item.username === data.username) {
        if (item.password === data.password) {
          res.send({status: 1, data: item})
          status = true
        } else {
          res.send({status: 10000})
          status = true
        }
      }
    })
    if (!status) res.send({status: 10001})
  })
}
