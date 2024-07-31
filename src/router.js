import Vue from 'vue';
import Router from 'vue-router';
import Generate from './views/Generate.vue';
import Admin from './views/Admin.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/festi-qr',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/qr-scanner',
      name: 'QRScanner',
      component: Generate
    }
  ]
});
