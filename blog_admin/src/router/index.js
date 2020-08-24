import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {path: '/', redirect: '/admin'},
    {path: '/admin',beforeEnter(to,from,next){
            // 判断是否登录
            // if (store.userInfo && (store.userInfo.admin === 'admin')){
            //     next();
            // }else{
            //     // 然后发起请求查看是否登录，本地可能刷新了
            //     userService.ifLogin().then(res => {
            //         if (res.code === 0 && (res.data.admin === 'admin')){
            //             store.dispatch('login',res.data);
            //             next();
            //         }else{
            //             next("/login")
            //         }
            //     });
            // }
            next();
        },
        component: () => import('../pages/admin/index'),
        children: [
            {
                path: '',
                name: 'Welcome',
                component: () => import('../pages/admin/welcome/Welcome')
            },
            {
                path: 'articleAdd/:id',
                name: 'ArticleAdd',
                component: () => import('../pages/admin/article/ArticleAdd')
            }
        ]
    },
    {path: '/login', name: 'Login', component: () => import("../pages/login/AdminLogin")},
];

let router = new VueRouter({
    routes
});

export default router;