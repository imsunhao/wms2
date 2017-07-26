/*****************************************************************************/
/*
 /* 开发开始时间 2017-7-8 16:58:49   author:imsunhao
 /*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用文件系统模块
 /*     功能                       文件系统            核心
 /*
 */
const fs = require('fs')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 引入文件系统-路径模块
 /*     功能            被           所有文件系统            依赖
 /*
 */
const path = require('path')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* TODO 启用express框架
 /*     功能            核心框架
 /*     功能            引入父系统
 /*     功能            引入子系统
 /*
 */
const express = require('express')
const app = express()

const index = require('./routes/index')                                //父系统
const imageServer = require('./routes/imageServer')                    //图片服务器
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用文件系统-读取模块
 /*     功能            被           文件系统-记录log            依赖
 /*
 */
const FileStreamRotator = require('file-stream-rotator')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* TODO 启用文件系统-记录log
 /*     功能            记录访问服务器日志
 /*     网址：     https://github.com/expressjs/morgan
 */
const logger = require('morgan')

const logDirectory = path.join(__dirname, 'log')         //日志系统路径
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'imSunHao-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站功能-图标
 /*     功能            统一调配图标
 /*     网址：
 */
const favicon = require('serve-favicon')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-session
 /*     功能            解析与生成    请求中    session
 /*     网址：
 */
const session = require('express-session')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-cookie
 /*     功能            解析与生成    请求中    cookie
 /*     网址：
 */
const cookieParser = require('cookie-parser')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-require
 /*     功能            解析    请求中     所有的参数
 /*     网址：
 */
const bodyParser = require('body-parser')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站数据存储系统-mongoose
 /*     功能            数据库     核心
 /*     网址：
 */
const mongoose = require('mongoose')

const mongoDBConfig = require('./Config/server/mongoBDConfig.json')             //网络数据库 配置
const MongoStore = require('connect-mongo')(session)                            //提供 session  数据库依赖

mongoose.Promise = global.Promise

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站view engine
 /*     功能            被           所有视图系统            依赖
 /*
 */
app.set('views', path.join(__dirname, 'views'))        //模板根路径
app.set('view engine', 'ejs')                          //模板为ejs模板
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* TODO 启用 数据库-链接
 /*     功能            被           session            依赖
 /*
 */
mongoose.connect('mongodb://' + mongoDBConfig.user + ':' + mongoDBConfig.password + '@'
  + mongoDBConfig.host + ':' + mongoDBConfig.port + '/' + mongoDBConfig.database + '?authSource='
  + mongoDBConfig.authSource, {native_parser: true, useMongoClient: true}) //网路数据库
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'))
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* TODO 启用 express 中间件
 /*     功能           见注释
 /*
 */
app.use(favicon(path.join(__dirname, 'public/image/favicon.ico')))   //图标
app.use(logger('combined', {stream: accessLogStream}))            //日志

app.use(bodyParser.json())            //请求解析 为json格式
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())                                           //请求解析 cookie
app.use(express.static(path.join(__dirname, 'public')))           //加载public资源
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* TODO 启用 session 中间件
 /*     功能           见注释
 /*
 */
app.use(session({
  key: 'session',
  secret: 's8^%4$V4KH5fd2dd0g',
  cookie: {maxAge: 1000 * 60 * 60 * 24},//1小时 //1k (s) * 60(min) *60 (hover) *24(day)
  store: new MongoStore({
    db: 'wms4',
    mongooseConnection: mongoose.connection
  }),
  resave: true,
  saveUninitialized: true
}))
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /*   访问统计 imsunhao
 /*     功能           见注释
 /*
 */

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用 路由适配
 /*     功能           见注释
 /*
 */

const devConfig = require('./config/dev')

/*主页*/
app.use('/', index)

// TODO wms 4.0 虚拟接口
const wms4 = require('./routes/wms4Mock')

// 标色
const {
  error,
  warning,
  pathLog,
  usernameLog
} = require('./config/dev')

// 登录验证
app.use(function (req, res, next) {
  if (!req.session.user) {
    if (req.session.fail && typeof req.session.firstTime !== 'undefined') {
      let se = (new Date().getTime() - new Date(req.session.firstTime).getTime())
      let minutes = Math.floor(se / (1000 * 60))
      if (minutes > 0) {
        delete req.session.firstTime
        delete req.session.fail
        delete req.session.frequency
        req.session.save()
        return next()
      } else {
        warning('存在用户尝试未在1min后登录！')
        res.send({status: 10004, data: se})
      }
    } else if (req.originalUrl !== '/wms4/users/Login') {
      let err = new Error(`未授权的用户尝试访问私密端口！\n\t\t端口:${req.originalUrl}\n\t\t时间：${(new Date()).toLocaleString()}`)
      err.status = 403
      next(err)
    } else {
      return next()
    }
  } else return next()
})

// 通知层-开始

app.use('/wms4', function (req, res, next) {
  req.timeStart = new Date()
  let user = usernameLog('有新的客户')
  if (req.session.user) {
    user = req.session.user.nickname
  }
  req.conso =
    `-----------------------------------------------
${user}\t发起请求:
\t请求路径：${pathLog(req.originalUrl)}
\t请求方法：${req.method}
\t请求参数：
\t\t${JSON.stringify(req.body)}
\t请求过程：

`
  next()
})

// 模拟网络延迟
app.use('/wms4', function (req, res, next) {
  setTimeout(function () {
    return next()
  }, devConfig.setTimeout)
})

// wms Mock
app.use('/wms4', wms4)

// 通知层-输出

app.use('/wms4', function (req, res, next) {
  let stringTime = StringTime(new Date().getTime() - req.timeStart.getTime()) // 时间差的毫秒数

  req.conso +=
    `
用户请求结束
用时:\t${stringTime}
-----------------------------------------------`
  console.log(req.conso)
})

/**
 *
 * @param date3
 * @returns {string}
 * @constructor
 */
function StringTime (date3) {
  let string = ''
  //计算相差的年数
  let years = Math.floor(date3 / (12 * 30 * 24 * 3600 * 1000))
  if (years) string += `${years} 年\t`
  //计算相差的月数
  let leave = date3 % (12 * 30 * 24 * 3600 * 1000)
  let months = Math.floor(leave / (30 * 24 * 3600 * 1000))
  if (months) string += `${months} 月\t`
  //计算出相差天数
  let leave0 = leave % (30 * 24 * 3600 * 1000)
  let days = Math.floor(leave0 / (24 * 3600 * 1000))
  if (days) string += `${days} 天\t`
  //计算出小时数
  let leave1 = leave0 % (24 * 3600 * 1000)     //计算天数后剩余的毫秒数

  let hours = Math.floor(leave1 / (3600 * 1000))
  if (hours) string += `${hours} 时\t`
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000)         //计算小时数后剩余的毫秒数

  let minutes = Math.floor(leave2 / (60 * 1000))
  if (minutes) string += `${minutes} 分\t`
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000)       //计算分钟数后剩余的毫秒数

  let seconds = Math.round(leave3 / 1000)
  if (seconds) string += `${seconds} 秒\t`

  let leave4 = leave3 % (1000)       //毫秒数
  let millisecond = Math.round(leave3)
  string += `${millisecond} 毫秒`

  return string
}

// TODO wms 4.0 端口转发
// 一旦切换为 真实端口 便没有通知层

const proxyMiddleware = require('http-proxy-middleware')
app.use(proxyMiddleware('/wms_cg_web', {
  target: 'http://127.0.0.1:8080/',
  // pathRewrite: {'^/api' : '/wms4'},
  secure: false,
  changeOrigin: false
}))

// error handler analysis
app.use(function (req, res, next) {
  let err = new Error(req.originalUrl + 'Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  error(err.status + '\t' + err.message)
  res.send({status: 40000 + err.status})
})

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 导出 服务
 /*
 */
module.exports = app
/*
 /*****************************************************************************/


