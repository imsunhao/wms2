import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';

import LoadingComp from '@/components/0_static/LoadingComp.vue';
import ErrorComp from '@/components/0_static/ErrorComp.vue';
import {time} from '../config/Loading';

Vue.use(Router);
Vue.use(Resource);

const User = {
  template: '<h2>User {{ $route.params.id }}</h2>',
};

const Login = () => ({
  component: import('@/components/Login.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

const Main = () => ({
  component: import('@/components/wms.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

const Pane = () => ({
  component: import('@/components/2_navigation/Pane.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

const Home = () => ({
  component: import('@/components/1_about/home.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/wms',
      component: Main,
      children: [
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'pane',
          component: Pane,
        },
        {
          path: 'user/:id',
          component: User,
        },
      ],
      beforeEnter: (to, from, next) => {
        console.log(from);
        setTimeout(() => { console.log('身份验证成功！'); next(); }, 10);
      },
    },
  ],
});
