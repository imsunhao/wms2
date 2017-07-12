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
  {
    commit: 'increment_1',
    payload (obj) {
      return {
        event: '测试而已222',
        amount: 1,
      };
    },
  },
];

