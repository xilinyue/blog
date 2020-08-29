import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {path: '',redirect: '/list'},
    {
        path: '/register',
        name: 'UserRegister',
        component: () => import('../pages/user/UserRegister')
    },
    {
        path: '/login',
        name: 'UserLogin',
        component: () => import('../pages/user/UserLogin')
    },
    {
        path: '/list',
        name: 'ArticleList',
        component: () => import('../pages/article/ArticleList')
    },
    {
        path: '/detail/:_id',
        name: 'ArticleDetail',
        component: () => import('../pages/article/ArticleDetail')
    }
];

export default new VueRouter({
    routes
});