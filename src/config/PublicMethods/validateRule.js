export default {
  vNumber: function (rule, value, callback) {
    if (isNaN(value)) {
      callback(new Error('必须为数字!'));
    } else {
      callback();
    }
  },                   // 是   数字
  vNumberZ: function (rule, value, callback) {
    if (value < 0) {
      callback(new Error('必须为正数!'));
    } else {
      callback();
    }
  },                  // 是   正数
  vNumberZZ: function (rule, value, callback) {
    if ((value + '').indexOf('.') !== -1) {
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
    var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    if (reg.test(value)) {
      callback(new Error('不能含有汉字!'));
    } else {
      callback();
    }
  },                      // 不含有 汉字
  vNTS: function (rule, value, callback) {
    if (/^\w+$/.exec(value)) {
      return callback();
    } else {
      return callback(new Error('不能含有特殊符号!'));
    }
  },                      // 不含有 特殊符号
  vN0Number: function (rule, value, callback) {
    if (value === 0) {
      callback(new Error('不能为0!'));
    } else {
      callback();
    }
  },                 // 不是 数字0

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
    var reg = new RegExp('^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$', 'g');
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
