import Home from './M0_Home';
import APP from './M_APP';
import Login from './M_Login';

const value = {
  Home,
  APP,
  Login,
};

function MutationsMethods (Mutations) {
  let step = {};
  Mutations.forEach(({commit, payload}) => {
    step[commit] = function () {
      this.$store.commit(commit.split('_')[0], payload(this));
    };
  });
  step.f = function (number, data) {
    this.$store.commit(Mutations[number].commit.split('_')[0], Mutations[number].payload(this, data));
  };
  return step;
}

function autoSelectMutations (name) {
  if (typeof value[name] === 'undefined') return {};
  else return MutationsMethods(value[name]);
}

export {
  MutationsMethods,
  autoSelectMutations,
};
