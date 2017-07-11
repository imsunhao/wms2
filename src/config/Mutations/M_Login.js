export default [
  {
    event_name: 'WIFI_PUT',
    commit: 'changeHttp',
    payload: (obj, data) => {
      return {
        event: '0 WIFI_PUT 获取到服务器中的WIFI-IP地址,更新到VueX中',
        amount: data,
      };
    },
  },
];

