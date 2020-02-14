require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import router from './router.js';

import App from './App.vue';

import Layout from './pages/layouts/Layout.vue';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
//線上
axios.defaults.baseURL = 'http://jasondemo.cf/PMS_SPA_test/public/api';
//本機
// axios.defaults.baseURL = 'http://localhost/PMS/public/api';

Vue.router = router
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

// 進度條
router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    next();
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
});
ViewUI.LoadingBar.config({
    color: '#2df0b1',
    failedColor: '#f0ad4e',
    height: 5
});


Vue.use(ViewUI);
// App.router = Vue.router
// new Vue(App).$mount('#app');
App.components = {
    'Layout' : Layout
};
new Vue({
    el: '#app',
    router:router,
    render: h => h(App)
})
