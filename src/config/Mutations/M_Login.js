export default [
  {
    event_name: 'UPDATE_WIFI',
    commit: 'updateHttp',
    payload: (obj, data) => {
      return {
        event: '0 PUT_WIFI 更新 http :获取到服务器中的WIFI-IP地址',
        amount: data,
      };
    },
  },
  {
    event_name: 'UPDATE_USER',
    commit: 'updateUser',
    payload: (obj, data) => {
      return {
        event: `1 UPDATE_USER 更新 user :${data.username}用户，已经登录`,
        amount: data,
      };
    },
  },
];

