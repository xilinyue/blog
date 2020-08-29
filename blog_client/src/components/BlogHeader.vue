<template>
    <div class="blog_header">
        <Header class="header">
            <div class="logo">
                Mr.Gan
                <router-link class="to_home" to="/">首页</router-link>
            </div>
            <div class="give_message">
                <Button icon="md-chatboxes">给我留言</Button>
            </div>
            <div class="login_register">
                <div class="info" v-if="userInfo">
                    <Dropdown @on-click="dropDownClick">
                        <a href="javascript:void(0)" style="color: #000">
                            <Avatar size="large" :src="userInfo.avator" />
                            <span>{{userInfo.userName}}</span>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="editAvatar">修改头像</DropdownItem>
                            <DropdownItem name="logout">退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="operation" v-else>
                    <Button type="primary" ghost @click="userOperation('/login')">登录</Button>
                    <Button type="success" ghost @click="userOperation('/register')">注册</Button>
                </div>
            </div>
        </Header>
    </div>
</template>

<script>
    import userService from "../api/userService";

    export default {
        name: "BlogHeader",
        data() {
            return {
                userInfo: {}
            }
        },
        mounted() {
            this.showUserInfo();
        },
        watch: {
            $route(to,from) {
                if (from.name === 'UserLogin') {
                    this.showUserInfo();
                }
            }
        },
        methods: {
            userOperation(path) {
                this.$router.push({path: path,query: {redirect: this.$route.path}});
            },
            dropDownClick(name){
                if(name === 'logout'){
                    userService.logout().then(res => {
                       if (res.code === 0){
                           this.$Message.success(res.message);
                           window.location.reload();
                       }
                    });
                }
            },
            showUserInfo() {
                this.userInfo = this.$store.state.userInfo;
                if(!this.userInfo) {
                    userService.ifLogin().then(res => {
                        if (res.code === 0){
                            //将数据储存到store中
                            this.$store.dispatch('login',res.data);
                            this.userInfo = this.$store.state.userInfo;
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .blog_header{
        .header{
            height: 80px;
            line-height: 80px;
            background-color: #fff;
            box-shadow: 0 0 5px rgba(0,0,0,.3);
            display: flex;
            .logo{
                flex: 1;
                font-family: BarbaraHand;
                font-size: 70px;
                padding-left: 200px;
                .to_home {
                    margin-left: 50px;
                    font-size: 20px;
                    color: #000;
                    letter-spacing: 10px;
                    font-family: Kaiti;
                    &:hover{
                        color: #2d8cf0;
                        font-weight: bold;
                    }
                }
            }
            .give_message{
                width: 150px;
            }
            .login_register{
                width: 150px;
                .info{
                    cursor: pointer;
                    span{
                        margin-left: 7px;
                    }
                }
                .operation{
                    .ivu-btn{
                        margin: 0 7px;
                    }
                }
            }
        }
    }
</style>