function MutationsMethods (Mutations) {
  let step = {};
  Mutations.forEach(({event_name, commit, payload}) => {
    step[event_name] = function () {
      this.$store.commit(commit, payload(this));
    };
  });
  step.f = function (number, data) {
    this.$store.commit(Mutations[number].commit, Mutations[number].payload(this, data));
  };
  return step;
}
export { MutationsMethods };
