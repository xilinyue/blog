<template>
    <div class="login">
        <Form ref="userForm"
              :model="userForm"
              :rules="userFormRules"
              class="login_form">
            <FormItem prop="user_name">
                <Input type="text" v-model="userForm.user_name" placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="userForm.password" placeholder="请输入密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem style="text-align: center">
                <Button type="primary" @click="handleSubmit('userForm')">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import userService from "../../api/userService";

    export default {
        name: "UserLogin",
        data () {
            return {
                userForm: {
                    user_name: '',
                    password: ''
                },
                userFormRules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        userService.userLogin(this.userForm).then(res => {
                            if (res.code === 0){
                                this.$Message.success(res.message);
                                if (this.$route.query.redirect) {
                                    this.$router.push(this.$route.query.redirect);
                                }else{
                                    this.$router.push("/")
                                }
                                //将数据储存到store中
                                this.$store.dispatch('login',res.data);
                            }else{
                                this.$Message.error(res.message);
                            }
                        });
                    } else {
                        this.$Message.error('请完善登录表单');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .login{
        width: 100%;
        height: calc(100vh - 100px);
        position: relative;
        .login_form{
            position: absolute;
            width: 500px;
            height: 260px;
            padding: 20px;
            border-radius: 10px;
            background-color: #fff;
            top: -250px;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            box-shadow: 0 0 15px rgba(45,140,240,.5);
            /deep/ .ivu-form-item{
                height: 60px;
                .ivu-input-group-prepend{
                    font-size:25px;
                }
                .ivu-input{
                    height: 50px;
                }
            }
        }
    }
</style>