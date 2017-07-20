import Home from './T1_home';

const value = {
  Home,
};

function autoSelectTables (name) {
  if (typeof value[name] === 'undefined') return {};
  else return Table(value[name]);
}

function Table (options) {
  let {
    data,
  } = options;

  return {
    data: [],
    multiSelect: false,
    key: data[0].prop,
    tableColumn: [data[0], data[1]],
    tableColumnAll: data,
  };
}

export {
  Table,
  autoSelectTables,
};
