import Vue from 'vue';
Vue.config.productionTip = true;

import VueX from 'vuex';
Vue.use(VueX);
import VueXConfig from './config/VueX';

import {
  Form,
  FormItem,
  MessageBox,
  Loading,
  Row,
  Notification,
  Message,
} from 'element-ui';

Vue.use(Form);
Vue.use(Row);
Vue.use(FormItem);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

import 'element-ui/lib/theme-default/index.css';

import LoadingComp from '@/components/0_static/LoadingComp.vue';
import ErrorComp from '@/components/0_static/ErrorComp.vue';
import VueQrcode from 'vue-qrcode';
Vue.component('loading-comp', LoadingComp);
Vue.component('error-comp', ErrorComp);
Vue.component('qrcode', VueQrcode);

import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
const store = new VueX.Store(VueXConfig);
sync(store, router);

import Mutations from './config/Mutations/M_APP';
import { MutationsMethods } from './config/Mutations';
import { publicMethods } from './config/Tools';

export default new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
  computed: {
    ...VueX.mapState(['http', 'user']),
  },
  methods: {
    ...MutationsMethods(Mutations),
    ...publicMethods(),
  },
});
