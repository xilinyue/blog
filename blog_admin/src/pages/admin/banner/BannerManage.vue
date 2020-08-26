<template>
    <div class="banner_manage">
        <main-title title="轮播图管理"></main-title>
        <el-table
                :data="bannerList"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="#"
                    width="60">
            </el-table-column>
            <el-table-column
                    label="标题"
                    prop="title">
            </el-table-column>
            <el-table-column
                    label="文章_id"
                    prop="url">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作">
                <template v-slot="scope">
                    <el-button type="danger" size="mini" @click="deleteBanner(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import bannerService from "../../../api/bannerService";
    export default {
        name: "BannerManage",
        components: {
            MainTitle
        },
        data() {
            return{
                bannerList: []
            }
        },
        mounted() {
            this.getBannerList();
        },
        methods: {
            getBannerList() {
                bannerService.bannerList().then(res => {
                   if (res.code === 0){
                       this.bannerList = res.data;
                   }
                });
            },
            deleteBanner(row) {
                this.$confirm('此操作将永久删除该录播图, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    bannerService.deleteBannerById(row._id).then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.message
                            });
                            this.getBannerList();
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