import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from './pages/Dashboard.vue';
import Home from './pages/Home.vue';
import Register from './pages/Register.vue';
import Login from './pages/Login.vue';
import Group from './pages/Group.vue';


Vue.use(VueRouter);


export default new VueRouter({
    model: 'history',
    //線上
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
        },
        {
            path: '/group',
            name: 'group',
            component: Group,
            meta: {
                auth: true,
            }
        }
    ]
})
