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

const Route = () => ({
  component: import('@/components/Route.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

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
  component: import('@/components/1_about/Home.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

const QRCode = () => ({
  component: import('@/components/3/QRCode.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

const Transfer = () => ({
  component: import('@/components/0_static/Transfer.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: time.delay,
  timeout: time.timeout,
});

export default new Router({
  routes: [
    {
      path: '/',
      component: Route,
    },
    {
      path: '/login/:code',
      component: Login,
    },
    {
      path: '/wms',
      component: Main,
      meta: { requiresAuth: true },
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
          path: 'qrcode',
          component: QRCode,
        },
        {
          path: 'user/:id',
          component: User,
        },
        {
          path: 'transfer',
          component: Transfer,
        },
      ],
    },
  ],
});
