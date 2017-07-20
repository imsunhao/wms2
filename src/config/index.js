import { autoSelectMutations } from './Mutations';
import { autoSelectValidate } from './Validate';
import { autoSelectTables } from './Table';

export default name => ({
  MutationsMethods: autoSelectMutations(name),
  Validate: autoSelectValidate(name),
  Tables: autoSelectTables(name),
});
