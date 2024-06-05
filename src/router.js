import Vue from 'vue';
import Router from 'vue-router';
import Generate from './Generate.vue';
import Admin from './Admin.vue';
import QRScanner from './QRScanner.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Generate
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/qr-scanner',
      name: 'QRScanner',
      component: QRScanner
    }
  ]
});
