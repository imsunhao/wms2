
import {autoValidatePuls} from '../Tools';

let step = {
  form: {
    'username': ['vNull', 'vNTS', 'vWS16'],
    'password': ['vNull', 'vWS16'],
  },
};

export default autoValidatePuls(step);
