import Vue from 'vue';
import Router from 'vue-router';

import LoadingComp from '@/components/LoadingComp.vue';
import ErrorComp from '@/components/ErrorComp.vue';

Vue.use(Router);

const User = {
  template: '<h2>User {{ $route.params.id }}</h2>',
};

const Home = () => ({
  component: import('@/components/Home.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: 200,
  timeout: 3000,
});
const Pane = () => ({
  component: import('@/components/1_Navigation/Pane.vue'),
  loading: LoadingComp,
  error: ErrorComp,
  delay: 200,
  timeout: 3000,
});

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/pane',
      component: Pane,
    },
    {
      path: '/user/:id',
      component: User,
    },
  ],
});
