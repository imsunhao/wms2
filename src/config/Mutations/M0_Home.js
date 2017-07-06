export default [
  {
    event_name: 'SOME_MUTATION1',
    commit: 'increment',
    payload: {
      event: '测试而已',
      amount: this.localCount,
    },
  },
  {
    event_name: 'SOME_MUTATION2',
    commit: 'increment',
    payload: {
      event: '测试而已222',
      amount: 1,
    },
  },
];
