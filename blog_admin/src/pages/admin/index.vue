<template>
    <div id="admin">
        <el-container>
            <el-header class="header">
                <h2>个人博客后台管理系统</h2>
                <!--左侧下拉框-->
            </el-header>
            <el-container class="main">
                <el-aside width="200px" class="aside">
                    <admin-nav-bar></admin-nav-bar>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import AdminNavBar from "../../components/AdminNavBar";
    export default {
        name: "admin",
        components: {
            AdminNavBar
        }
    }
</script>

<style scoped >
    #admin{
        width: 100%;
        height: 100%;
    }
    .header{
        position: fixed;
        width: 100%;
        z-index: 9;
        background-color: #409EFF;
    }
    .main{
        padding-top: 60px;
    }
    h2{
        height: 60px;
        line-height: 60px;
        font-family: Kaiti;
    }
    .el-container{
        width: 100%;
        height: 100%;
    }
    .aside{
        background-color: #E9E9EB;
    }
</style>