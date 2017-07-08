function speckText (str) {
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

const validateRule = {
  vNumber: function (rule, value, callback) {
    if (isNaN(value)) {
      callback(new Error('必须为数字!'));
    } else {
      callback();
    }
  },                   // 是   数字
  vNumberZZ: function (rule, value, callback) {
    if (value < 0 || ((value + '').indexOf('.') !== -1)) {
      callback(new Error('必须为正整数!'));
    } else {
      callback();
    }
  },                 // 是   正整数

  vNull: function (rule, value, callback) {
    if (value === '') {
      callback(new Error('必填!'));
    } else {
      callback();
    }
  },                     // 不是 空
  vNHZ: function (rule, value, callback) {
    let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    if (reg.test(value)) {
      callback(new Error('不能含有汉字!'));
    } else {
      callback();
    }
  },                      // 不含有 汉字
  vNTS: function (rule, value, callback) {
    if ((new RegExp(/^\w+$/, 'g')).exec(value)) {
      return callback();
    } else {
      return callback(new Error('不能含有特殊符号!'));
    }
  },                      // 不含有 特殊符号

  vWS4: function (rule, value, callback) {
    if ((value + '').length > 4) {
      return callback(new Error('必须小于4位!'));
    } else {
      return callback();
    }
  },                      // 必须小于4位
  vWS16: function (rule, value, callback) {
    if ((value + '').length > 16) {
      return callback(new Error('必须小于16位!'));
    } else {
      return callback();
    }
  },                     // 必须小于16位

  v_Car: function (rule, value, callback) {
    let reg = new RegExp('^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$', 'g');
    if (!reg.test(value)) {
      return callback(new Error('必须为中国车牌号!'));
    } else {
      return callback();
    }
  },                     // 必须为车牌号

  v$User1: function (rule, value, callback) {
    if ((value + '').length < 6 && (value + '').length !== 0) {
      return callback(new Error('必须大于6位!或者不填写'));
    } else {
      return callback();
    }
  },                   // 必须大于6位!或者不填写
};

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

export {
  speckText,                 // 核心 语音播报
  autoValidate,              // 核心 自动prop组合 for validate验证
  autoValidatePuls,          // 核心 自动obj组合 for validate验证
};
