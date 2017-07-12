const state = {
  user: {
    username: '',
    password: '',
  },
};

const mutations = {
  updateUser (state, payload) {
    state.user = payload.amount;
  },
};

const actions = {};

const gatters = {};

export { state, mutations, actions, gatters };
