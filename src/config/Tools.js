import { statusConfig, validateRule } from './PublicMethods';

const SPECK = false;

function speckText (str) {
  if (!SPECK) return;
  // var request=  new URLRequest();
  let url = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' + encodeURI(str);        // baidu
  // url = "http://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&textlen=19&prev=input&q=" + encodeURI(str); // google

  // request.url = encodeURI(url);
  // request.contentType = "audio/mp3"; // for baidu
  // request.contentType = "audio/mpeg"; // for google

  let n = new Audio(url);

  n.src = url;

  n.play();

  // $("...").play();
  // var sound = new Sound(request);
  // sound.play();
}

function autoValidate (option, cbs) {
  // function autoValidateRule(string, model) {
  //     return function (rule, value, callback) {
  //         if ((new RegExp(string, "g")).exec(value)) {
  //             return callback(new Error(model));
  //         }
  //         else {
  //             return callback();
  //         }
  //     };
  // }
  let temp = Object.create(null);
  let i = 0;
  for (let index in option) {
    if (option.hasOwnProperty(index)) {
      let type = typeof option[index];
      switch (type) {
      case 'object':
        temp[index] = [];
        for (let b in option[index]) {
          if (option[index].hasOwnProperty(b)) {
            temp[index].push({validator: validateRule[option[index][b]], trigger: 'blur'});
          }
        }
        break;
      case 'string':
        if (!option[index]) {
          temp[index] = [{validator: cbs[i++], trigger: 'blur'}];
        } else {
          temp[index] = [{validator: validateRule[option[index]], trigger: 'blur'}];
        }
        break;
      }
    }
  }
  return temp;
  /* autoValidate({
   pass:'',
   imsunhao:'vNull',
   name:['vNull','a']
   }, [
   function(rule, value, callback){
   console.log(123)
   }
   ]); */
}

function autoValidatePuls (obj) {
  for (let index in obj) {
    if (obj.hasOwnProperty(index)) {
      obj[index] = autoValidate(obj[index]);
    }
  }
  return obj;
}

function p (url, body, option) {
  let {loading} = option;
  this.$http.post(url, body)
  .then(response => {
    if (loading)loading.close();
    let status = response.body.status;
    let {
      s,         // 判断为 成功之后的 函数回调
      e,         // 判断为 失败之后的 函数回调
      show,      // 是否显示 成功与失败 后的 通知窗
      showS,     // 是否显示 成功      后的 通知窗
      showE,     // 是否显示 失败      后的 通知窗
      title,     // 手动设置 标题
      message,   // 手动设置 通知内容
      type,      // 手动设置 失败后提示的样式
    } = option;
    if (status < 10000) {
      if (show || showS) {
        this.$notify({
          title: title || statusConfig[status].title || '成功',
          message: message || statusConfig[status].message || statusConfig[status],
          type: 'success',
        });
      }
      if (s) s(response);
    } else {
      if (show || showE) {
        this.$notify({
          title: title || statusConfig[status].title || '失败',
          message: message || statusConfig[status].message || statusConfig[status],
          type: type || 'error',
        });
      }
      if (e) e(response);
    }
  })
  .catch(response => {
    if (loading)loading.close();
    let {status, bodyText} = response;
    console.log(status, bodyText);
    this.$alert('服务器未响应！', '提示', {
      confirmButtonText: '我知道了',
      callback: action => {
        if (option.e) option.e(response);
      },
    });
  });
}

function publicMethods () {
  return {
    p,               // post 核心
  };
}

function formatterTime (value, number) {
  if (value === '') return '';
  if (value === null) return '';
  if (typeof value === 'undefined') return '';
  switch (number) {
  case 1:
    return dateFormat(new Date(value), 'yyyy年 MM月 dd日');
  case 2:
    return dateFormat(new Date(value), 'MM-dd');
  case 3:
    return dateFormat(new Date(value), 'yyyy-MM-dd');
  case 4:
    return dateFormat(new Date(value), 'yyyy/MM/dd hh:mm');
  case 5:
    return dateFormat(new Date(value), 'yyyy年 MM月 dd日 hh:mm');
  default:
    return dateFormat(new Date(value), 'yyyy-MM-dd');
  }

  function dateFormat (date, fmt) {
    const o = {
      'M+': date.getMonth() + 1,                 // 月份
      'd+': date.getDate(),                    // 日
      'h+': date.getHours(),                   // 小时
      'm+': date.getMinutes(),                 // 分
      's+': date.getSeconds(),                 // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds(),             // 毫秒
    };
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
    }
    return fmt;
  }      // 转换时间核心
}

export {
  speckText,                 // 核心 语音播报
  autoValidate,              // 核心 自动prop组合 for validate验证
  autoValidatePuls,          // 核心 自动obj组合 for validate验证
  publicMethods,             // VUE 页面级别 必备函数
  formatterTime,             // 格式化 日期
};
