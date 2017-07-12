export default [
  {
    commit: 'updateHttp_0',
    payload: (obj, data) => {
      return {
        event: '更新 http :获取到服务器中的WIFI-IP地址',
        amount: data,
      };
    },
  },
  {
    commit: 'updateUser_1',
    payload: (obj, data) => {
      return {
        event: `更新 user :${data.username}用户，已经登录`,
        amount: data,
      };
    },
  },
];

