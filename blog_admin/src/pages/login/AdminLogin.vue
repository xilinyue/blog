<template>
    <div class="login">
        <div class="main">
            <h1>登录</h1>
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="100px">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-submit">
                <el-button type="primary" @click="submitLogin">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import userService from "../../api/userService";
    export default {
        name: "index",
        data() {
            return{
                loginForm: {
                    username: '',
                    password: ''
                },
                loginFormRules: {
                    username: [
                        // {required: true, message: '请输入用户名', trigger: 'blur'},
                        { validator: (rule, value, callback) => {
                                if (!value){
                                    callback(new Error("用户名不能为空"));
                                }
                                callback();
                            }, trigger: 'blur'
                        },
                        {
                            type: 'string',
                            pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
                            message: '2-7位，数字 字母 _ - 中日韩文',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        // {required: true, message: '请输入密码', trigger: 'blur'},
                        { validator: (rule, value, callback) => {
                                if (!value){
                                    callback(new Error("密码不能为空"));
                                }
                                callback();
                            }, trigger: 'blur'
                        },
                        {
                            type: 'string',
                            pattern: /^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/,
                            message: '6-18位，不包含特殊字符',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        methods: {
            submitLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid){
                        userService.login(this.loginForm.username,this.loginForm.password).then(res => {
                            if (res.code){
                                //登录失败
                                this.$message({
                                    type: 'error',
                                    message: res.message,
                                    duration: 3000
                                });
                            }else{
                                this.$message({
                                    type: 'success',
                                    message: res.message,
                                    duration: 3000
                                });
                                //将数据储存到store中
                                this.$store.dispatch('login',res.data);
                                this.$router.push("/admin");
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 100%;
    }
    .main {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 500px;
        height: 300px;
        box-sizing: border-box;
        border: 1px solid #eee;
        border-radius: 10px;
        box-shadow: 0 0 10px #ddd;
        padding: 38px 20px;
    }
    .main h1{
        text-align: center;
        font-family: Kaiti;
        font-size: 25px;
        margin-bottom: 10px;
    }
    .el-form-item__label{
        text-align: center;
    }
    .el-input__inner{
        height: 50px;
    }
    .el-form-item__label{
        font-size: 16px;
        font-weight: 700;
        height: 50px;
        line-height: 50px;
    }
    .login-submit{
        width: 100%;
        text-align: center;
    }
</style>