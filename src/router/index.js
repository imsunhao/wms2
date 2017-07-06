import Vue from 'vue';
import Router from 'vue-router';

import LoadingComp from '@/components/0_static/LoadingComp.vue';
import ErrorComp from '@/components/0_static/ErrorComp.vue';

Vue.use(Router);

const User = {
  template: '<h2>User {{ $route.params.id }}</h2>',
};

const delay = 200;
const timerout = 3000;

const Login = () => ({
  component: import('@/components/Login.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: delay,
  timeout: timerout,
});

const Main = () => ({
  component: import('@/components/wms.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: delay,
  timeout: timerout,
});

const Pane = () => ({
  component: import('@/components/2_navigation/Pane.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: delay,
  timeout: timerout,
});

const Home = () => ({
  component: import('@/components/1_about/home.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: delay,
  timeout: timerout,
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
        console.log('身份验证！');
        next();
      },
    },
  ],
});
