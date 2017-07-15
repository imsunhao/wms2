export default [
  {
    commit: 'increment_0',
    payload: obj => {
      return {
        event: '测试而已',
        amount: obj.$data.localCount,
      };
    },
  },
];

