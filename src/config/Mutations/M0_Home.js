export default [
  {
    event_name: 'SOME_MUTATION1',
    commit: 'increment',
    payload: obj => {
      return {
        event: '测试而已',
        amount: obj.$data.localCount,
      };
    },
  },
  {
    event_name: 'SOME_MUTATION2',
    commit: 'increment',
    payload (obj) {
      return {
        event: '测试而已222',
        amount: 1,
      };
    },
  },
];

