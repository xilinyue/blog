import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {path: '',redirect: '/list'},
    {
        path: '/list',
        name: 'ArticleList',
        component: () => import('../pages/article/ArticleList')
    }
];

export default new VueRouter({
    routes
});