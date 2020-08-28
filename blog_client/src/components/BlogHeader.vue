<template>
    <div class="blog_header">
        <Header class="header">
            <div class="logo">
                Mr.Gan
            </div>
            <div class="give_message">
                <Button icon="md-chatboxes">给我留言</Button>
            </div>
            <div class="login_register">
                <Button type="primary" ghost>登录</Button>
                <Button type="success" ghost>注册</Button>
            </div>
        </Header>
    </div>
</template>

<script>
    export default {
        name: "BlogHeader"
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
            }
            .give_message{
                width: 150px;
            }
            .login_register{
                width: 150px;
                .ivu-btn{
                    margin: 0 7px;
                }
            }
        }
    }
</style>