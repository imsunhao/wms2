const express = require('express')
const router = express.Router()

const conf =require('../config/dev')

if(conf.wifi){
  const fs = require('fs')
  let wifi={
    ip: '127.0.0.1'
  };

  fs.readFile('C:/Program Files (x86)/360/360AP/360APDHCPSvr.ini', function (err, data) {
    if (err) {
      console.log('读取文件 wifi 配置文件 fail!')
    } else {
      let wifiConfig = data.toString()
      wifiConfig = wifiConfig.split('\r\n')
      wifi = {
        ip: wifiConfig[1]
      }
      console.log('成功读取 wifi 配置文件\n\twifi-ip:' + wifi.ip)
    }
  })

  router.get('/wifi', function (req, res, next) {
    res.send(wifi.ip)
  })
}

require('./Mock/users')(router);
require('./Mock/M1_home')(router);

module.exports = router
