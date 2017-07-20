// const express = require('express')
// const app = express()
const xlsx = require('node-xlsx')
// const router = express.Router()
const http = require('http')

const fs = require('fs')
let result = []

fs.readFile('C:\\project\\study\\vueWebSim2\\test\\gitLog\\log\\1.txt', function (err, data) {
  if (err) {
    console.log('读取日志文件失败!')
  } else {
    let p = /Author: (\w+) <(\w[-\w.+]*@[A-Za-z0-9][-A-Za-z0-9]+\.+[A-Za-z]{2,14})> Date:   ([\s\S]{29,30})      ([\w \！\!\-\.\,\，\。\‘\“\"\'\、\n/\·A-Z\u4e00-\u9fa5]+)  commit/g
    data = data.toString().replace(/\n/g, ' ')

    let res = []

    while (step = p.exec(data.toString())) {
      res.push({
        Author: step[1],
        Email: step[2],
        Time: step[3],
        Content: step[4],
      })
    }

    let i = 0
    for (item of res) {
      i++
      let {Author, Time, Content} = item
      if (!result[Author]) result[Author] = [['Time', 'Content']]
      result[Author].push([new Date(Time).toLocaleString(), Content])
      // console.log(`${Author}\t${Email}\t${new Date(Time).toLocaleString()}\t${Content}`)
    }
    // for(item of result){
    //   let {Author,Email,Time,Content}=item;
    //   if(Author==='imzhangxing')console.log(`${Author}\t${Email}\t${new Date(Time).toLocaleString()}\t${Content}`);
    // }

    console.log('成功读取 共' + i + '条！')
    // console.log(data.toString())
    let option = []
    for (index in result) {
      if (result.hasOwnProperty(index)) {
        option.push({
          name: index,
          data: result[index]
        })
        console.log(index + ' 共' + (result[index].length - 1) + '条！')
      }
    }
    let buffer = xlsx.build(option)
    fs.writeFileSync('./output/wms4.xlsx', buffer, 'binary')
  }

})

// router.get('/exportExcel', function (req, res, next) {
// // write
//   let option = []
//   for (index in result) {
//     if (result.hasOwnProperty(index)) {
//       option.push({
//         name: index,
//         data: result[index]
//       })
//       console.log(index + ' 共' + result[index].length + '条！')
//     }
//   }
//   let buffer = xlsx.build(option)
//   fs.writeFileSync('b.xlsx', buffer, 'binary')
//   res.send('export successfully!')
//
// })
//
// app.use('/', router)
// app.set('port', 19999)
// const server = http.createServer(app)
// server.listen(19999)
