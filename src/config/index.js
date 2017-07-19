import { autoSelectMutations } from '~/Mutations';
import { autoSelectValidate } from '~/Validate';

export default name => ({
  MutationsMethods: autoSelectMutations(name),
  Validate: autoSelectValidate(name),
});
