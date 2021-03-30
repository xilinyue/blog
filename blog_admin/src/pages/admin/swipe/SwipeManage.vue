<template>
    <div class="swipe_manage">
        <main-title title="轮播图管理"></main-title>
        <el-table
                :data="swipeList"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="#"
                    width="60">
            </el-table-column>
            <el-table-column
                    label="图片地址"
                    prop="image">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作">
                <template v-slot="scope">
                    <el-button type="danger" size="mini" @click="deleteSwipe(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import swipeService from "../../../api/swipeService";
    export default {
        name: "SwipeManage",
        components: {
            MainTitle
        },
        data() {
            return{
                swipeList: []
            }
        },
        mounted() {
            this.getSwipeList();
        },
        methods: {
            getSwipeList() {
                swipeService.swipeList().then(res => {
                   if (res.code === 0){
                       this.swipeList = res.data;
                   }
                });
            },
            deleteSwipe(row) {
                this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    swipeService.deleteSwipeById(row._id).then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.message
                            });
                            this.getSwipeList();
                        }else{
                            this.$message({
                                type: 'danger',
                                message: res.message
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>