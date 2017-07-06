function MutationsMethods (Mutations) {
  let step = {};
  Mutations.forEach(({ event_name, commit, payload }) => {
    step[event_name] = function () {
      this.$store.commit(commit, payload);
    };
  });
  return step;
}
export {MutationsMethods};
