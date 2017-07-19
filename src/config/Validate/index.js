
import {autoValidatePuls} from '../Tools';

import Login from './V_Login';

const value = {
  Login,
};

function autoSelectValidate (name) {
  if (typeof value[name] === 'undefined') return {};
  else return autoValidatePuls(value[name]);
}

export {
  autoSelectValidate,
};
