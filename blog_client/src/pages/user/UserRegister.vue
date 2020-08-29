<template>
    <div class="register">
        <Form ref="userForm"
              :model="userForm"
              :rules="userFormRules"
              :label-width="80"
              class="register_form">
            <FormItem label="用户名" prop="user_name">
                <Input v-model="userForm.user_name" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" v-model="userForm.password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="password_confirm">
                <Input type="password" v-model="userForm.password_confirm" placeholder="请确认密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="success" @click="handleSubmit('userForm')">注册</Button>
                <Button @click="handleReset('userForm')" style="margin-left: 15px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import userService from "../../api/userService";

    export default {
        name: 'UserRegister',
        data () {
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.userForm.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                userForm: {
                    user_name: '',
                    password: '',
                    password_confirm: '',
                },
                userFormRules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 4, max: 8, message: "用户名长度在4-8之间", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: "用户名长度在6-16之间", trigger: "blur" }
                    ],
                    password_confirm: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        userService.userRegister(this.userForm).then(res => {
                           if (res.code === 0){
                               this.$Message.success(res.message);
                               if (this.$route.query.redirect) {
                                   this.$router.push(this.$route.query.redirect);
                               }else{
                                   this.$router.push("/")
                               }
                           }else{
                               this.$Message.error(res.message);
                           }
                        });
                    } else {
                        this.$Message.error('请完善注册表单!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
    .register{
        width: 100%;
        height: calc(100vh - 100px);
        position: relative;
        .register_form{
            position: absolute;
            width: 500px;
            height: 250px;
            padding: 20px;
            border-radius: 10px;
            background-color: #fff;
            top: -250px;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            box-shadow: 0 0 15px rgba(25,190,107,.5);
        }
    }
</style>
