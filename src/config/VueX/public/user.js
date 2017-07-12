const state = {
  user: {
    username: '',
    nickname: '',
    role: '',
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
