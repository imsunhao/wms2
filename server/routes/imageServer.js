const express = require('express')
const router = express.Router()
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')
const request = require('request')
const server = require('../config/server/wmsServerHost.json')

router.post('/', function (req, res, next) {
  //生成multiparty对象，并配置上传目标路径
  let form = new multiparty.Form({uploadDir: '../public/static/images/users/'})
  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    let url = files.file[0].originalFilename.split('.')
    let path = files.file[0].path.split('\\')[5]
    if (err) {
      console.log('parse error: ' + err)
      return
    }

    let step = {}
    extendDeepCopy(req.session.user.rmsUser, step)
    step.ruPortrait = path

    request({
      url: 'http://' + server.host + ':' + server.port + server.path + '/user',
      method: 'PUT',
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: step
    }, function (error, response, json) {
      if (!error && response.statusCode === 200) {
        let oldPortrait = req.session.user.rmsUser.ruPortrait
        if (oldPortrait !== '' && oldPortrait !== 'base1.png' && oldPortrait !== 'base2.png') fs.unlink('../public/static/images/users/' + req.session.user.rmsUser.ruPortrait)
        req.session.user.rmsUser.ruPortrait = step.ruPortrait
        res.end(JSON.stringify({status: 200, ruPortrait: req.session.user.rmsUser.ruPortrait}))
      } else {
        fs.unlink(files.file[0].path)
        return res.send({
          status: 500,
          message: '服务器未响应'
        })
      }
    })
  })
})

function extendDeepCopy (obj, newObj = {}) {
  for (let i in obj) {
    newObj[i] = obj[i]
    // if (typeof obj[i] === 'object') {
    //     newObj[i] = (obj[i].constructor === Array) ? [] : {};
    //     extendDeepCopy(obj[i], newObj[i]);
    // } else {
    //
    // }
  }
  return newObj
}     //深克隆

module.exports = router
