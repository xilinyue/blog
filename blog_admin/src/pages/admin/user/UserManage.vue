<template>
    <div class="user_manage">
        <main-title title="用户管理"></main-title>
        <el-table :data="userList"
                  stripe
                  border
                  style="width: 100%">
            <el-table-column
                    type="index"
                    label="#">
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="user_name">
            </el-table-column>
            <el-table-column
                    label="头像"
                    width="150px"
                    align="center">
                <template v-slot="scope">
                    <span class="avatar" :style="{backgroundImage: 'url('+scope.row.avator+')'}"></span>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否管理员">
                <template v-slot="scope">
                    <el-switch
                            v-model="scope.row.is_admin"
                            disabled
                            active-color="#13ce66">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="注册时间">
                <template v-slot="scope">
                    {{scope.row.create_time | time}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import userService from "../../../api/userService";
    export default {
        name: "UserManage",
        components: {
            MainTitle
        },
        data() {
            return{
                userList: []
            }
        },
        mounted() {
            this.getUserList();
        },
        methods: {
            getUserList() {
                userService.userList().then(res => {
                    if (res.code === 0){
                        this.userList = res.data;
                    }
                })
            }
        },
        filters: {
            time(value) {
                let date = new Date(parseInt(value));
                let y,m,d,H,M,S;
                y = date.getFullYear();
                m = date.getMonth() + 1;
                d = date.getDate();
                H = date.getHours();
                M = date.getMinutes();
                S = date.getSeconds();
                return y + '-' + m + '-' + d + ' ' + H + ':' + M + ':' + S;
            }
        }
    }
</script>

<style scoped>
    .avatar {
        display: inline-block;
        width: 60px;
        height: 60px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 10px;
    }
</style>