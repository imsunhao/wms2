export default [
  {
    commit: 'updateUser_0',
    payload: (obj, data) => {
      return {
        event: `更新 user :${data.username}用户，已经登录`,
        amount: data,
      };
    },
  },
];

