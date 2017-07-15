import {formatterTime} from '../Tools';

function Table (options) {
  let {
    data,
  } = options;

  return {
    multiSelect: false,
    key: data[0].prop,
    tableColumn: [data[0], data[1]],
    tableColumnAll: data,
  };
}

export {
  Table,
  formatterTime,
};
