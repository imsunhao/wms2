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
 /* 启用express框架
 /*     功能            核心框架
 /*     功能            引入父系统
 /*     功能            引入子系统
 /*
 */
const express = require('express')
const app = express()

const index = require('./routes/index')                                //父系统
const imageServer = require('./routes/imageServer')                    //图片服务器
const wms4 = require('./routes/wms4Mock')                              //wms 4.0 虚拟接口
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
 /* 启用文件系统-记录log
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
 /* 启用 数据库-链接
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
 /* 启用 express 中间件
 /*     功能           见注释
 /*
 */
app.use(favicon(path.join(__dirname, 'public', 'image', 'favicon.ico')))   //图标
app.use(logger('combined', {stream: accessLogStream}))            //日志

app.use(bodyParser.json({type: 'application/*+json'}))            //请求解析 为json格式
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())                                           //请求解析 cookie
app.use(express.static(path.join(__dirname, 'public')))           //加载public资源
/*
 /*****************************************************************************/




/*****************************************************************************/
/*
 /* 启用 session 中间件
 /*     功能           见注释
 /*
 */
app.use(session({
  key: 'session',
  secret: 's8^%4$V4KH5fd2dd0g',
  cookie: {maxAge: 1000 * 60 * 60 * 24},//1小时 //1k (s) * 60(min) *60 (hover) *24(day)
  store: new MongoStore({
    db: 'wms',
    mongooseConnection: mongoose.connection
  }),
  resave: true,
  saveUninitialized: true
}))
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /*   TODO 访问统计 imsunhao
 /*     功能           见注释
 /*
 */

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用 用户登陆身份验证 中间件
 /*     功能           见注释
 /*
 */
// app.use(function (req, res, next) {
//   //demo req.originalUrl.match(/\/article\/read\/.*/)
//   if (/^.+\./.test(req.originalUrl) || /^\/page\/.+/.test(req.originalUrl)) return next()
//   /*<debug>*/
//   console.log('---------启用验证！------------------')
//   if (typeof req.session.user !== 'undefined')
//     console.log(req.session.user.rmsUser.ruUserName)
//   else {
//     console.log('未登录用户')
//   }
//   console.log(req.originalUrl)
//   // console.log("--------------------------------------");
//   /*</debug>*/
//   if (req.session.user || req.originalUrl == '/users/login') {
//     next()
//   } else {
//     return res.redirect('/users/login')
//   }
// })

// function a(test) {
//     return /^.+\./.test(test)||/^\/page\/.+/.test(test)
// }

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用 路由适配
 /*     功能           见注释
 /*
 */

/*主页*/
app.use('/', index)

/*wms Mock*/
app.use('/wms4', wms4)


// error handler analysis
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  // res.status(err.status || 500);
  res.send({status: err.status, model: err.message})
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


