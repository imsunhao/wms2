function MutationsMethods (Mutations) {
  let step = {};
  Mutations.forEach(({ event_name, commit, payload }) => {
    step[event_name] = function () {
      this.$store.commit(commit, payload(this));
    };
  });
  return step;
}
export {MutationsMethods};
