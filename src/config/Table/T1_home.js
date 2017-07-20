import {formatterTime} from '../Tools';

const data = [
  {prop: 'id', label: '商品 ID', minWidth: '0px'},
  {prop: 'name', label: '商品名称', minWidth: '0px'},
  {prop: 'time',
    label: '上线时间',
    minWidth: '0px',
    className: 'rowTime',
    formatter: function (row, column) {
      return formatterTime(row[column.property]);
    }},
  {prop: 'category', label: '商品分类', minWidth: '0px'},
  {prop: 'desc', label: '商品描述', minWidth: '0px'},
  {prop: 'shop', label: '所属店铺', minWidth: '0px'},
  {prop: 'shopId', label: '店铺 ID', minWidth: '0px'},
  {prop: 'address', label: '店铺地址', minWidth: '0px'},
];

export default {
  data,
};
