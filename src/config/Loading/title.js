export default (number) => {
  switch (number) {
  case 0:
    return '身份验证中...';
  case 1:
    return '模块加载中...';
  default:
    return '拼命加载中...';
  }
};
