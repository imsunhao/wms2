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
export { MutationsMethods };
