import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from './components/Dashboard.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';


Vue.use(VueRouter);


export default new VueRouter({
    model: 'history',
    base: 'PMS_SPA_test/public',
    // base: 'PMS/public',
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                auth: true,
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                auth: false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                auth: false
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                auth: true,
            }
        }
    ]
})
