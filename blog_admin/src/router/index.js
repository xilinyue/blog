import Vue from 'vue';
import VueRouter from 'vue-router';
import userService from "../api/userService";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
    {path: '/', redirect: '/admin'},
    {path: '/admin',beforeEnter(to,from,next){
            // 判断是否登录
            if (store.userInfo && (store.userInfo.role === 'admin')){
                console.log(store.userInfo);
                next();
            }else{
                // 然后发起请求查看是否登录，本地可能刷新了
                userService.ifLogin().then(res => {
                    if (res.code === 0 && (res.data.role === 'admin')){
                        store.dispatch('login',res.data);
                        next();
                    }else{
                        next("/login")
                    }
                });
            }
            next();
        },
        component: () => import('../pages/admin/index'),
        children: [
            {
                path: '',
                name: 'Welcome',
                component: () => import('../pages/admin/welcome/Welcome')
            },{
                path: 'userManage',
                name: 'UserManage',
                component: () => import('../pages/admin/user/UserManage')
            },{
                path: 'articleAdd/:id',
                name: 'ArticleAdd',
                component: () => import('../pages/admin/article/ArticleAdd')
            },{
                path: 'articleManage',
                name: 'ArticleManage',
                component: () => import('../pages/admin/article/ArticleManage')
            },{
                path: 'articleCommentManage',
                name: 'ArticleCommentManage',
                component: () => import('../pages/admin/article/ArticleCommentManage')
            },{
                path: 'tagAdd',
                name: 'TagAdd',
                component: () => import('../pages/admin/tag/TagAdd')
            },{
                path: 'tagManage',
                name: 'TagManage',
                component: () => import('../pages/admin/tag/TagManage')
            },{
                path: 'bannerAdd',
                name: 'BannerAdd',
                component: () => import('../pages/admin/banner/BannerAdd')
            },{
                path: 'bannerManage',
                name: 'BannerManage',
                component: () => import('../pages/admin/banner/BannerManage')
            },{
                path: 'messageManage',
                name: 'MessageManage',
                component: () => import('../pages/admin/message/MessageManage')
            },{
                path: 'swipeAdd',
                name: 'SwipeAdd',
                component: () => import('../pages/admin/swipe/SwipeAdd')
            },{
                path: 'swipeManage',
                name: 'SwipeManage',
                component: () => import('../pages/admin/swipe/SwipeManage')
            }
        ]
    },
    {path: '/login', name: 'Login', component: () => import("../pages/login/AdminLogin")},
];

let router = new VueRouter({
    routes
});

export default router;