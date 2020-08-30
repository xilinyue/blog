<template>
    <div>
        <el-menu
                router
                unique-opened
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#E9E9EB"
                text-color="#000"
                active-text-color="#409EFF">
            <el-submenu :index="index+1 + ''" v-for="(item,index) in tabList" :key="index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item :index="'/admin' + cItem.path" v-for="(cItem,cI) in item.children" :key="cI">
                    <span slot="title">{{cItem.title}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "AdminNavBar",
        data() {
            return{
                tabList: [
                    {title: '用户管理',icon: 'el-icon-user-solid',children: [
                            {title: '用户管理',path: '/userManage'}
                        ]},
                    {title: '标签管理',icon: 'el-icon-s-promotion',children: [
                            {title: '标签管理',path: '/tagManage'},
                            {title: '添加标签',path: '/tagAdd'}
                        ]},
                    {title: '文章管理',icon: 'el-icon-s-order',children: [
                            {title: '文章管理',path: '/articleManage'},
                            {title: '添加文章',path: '/articleAdd/0'},
                            {title: '评论管理',path: '/articleCommentManage'}
                        ]},
                    {title: '轮播图',icon: 'el-icon-picture',children: [
                            {title: '轮播图管理',path: '/bannerManage'},
                            {title: '添加轮播图',path: '/bannerAdd'}
                        ]},
                    {title: '留言管理',icon: 'el-icon-s-comment',children: [

                            {title: '留言管理',path: '/messageManage'}
                        ]},
                ]
            }
        },
        methods: {
            handleOpen() {

            },
            handleClose() {}
        }
    }
</script>

<style scoped>

</style>