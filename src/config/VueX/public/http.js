const state = {
  http: {
    ip: '',
    port: 0,
  },
};

const mutations = {
  updateHttp (state, payload) {
    state.http = payload.amount;
  },
};

const actions = {};

const gatters = {};

export { state, mutations, actions, gatters };
