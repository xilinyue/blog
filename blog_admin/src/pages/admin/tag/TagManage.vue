<template>
    <div class="tag_manage">
        <main-title title="标签管理"></main-title>
        <el-table
                :data="tags"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="#"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="300">
                <template v-slot="scope">
                    <el-button type="danger" size="mini" @click="deleteTag(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import articleInfoService from "../../../api/articleInfoService";
    export default {
        name: "TagManage",
        components: {
            MainTitle
        },
        data() {
            return{
                tags: []
            }
        },
        mounted() {
            this.listTag();
        },
        methods: {
            listTag() {
                articleInfoService.listTag().then(res => {
                    let list = [];
                    res.data.forEach(item => {
                        list.push({"name": item});
                    });
                    this.tags = list;
                });
            },
            deleteTag(row){
                console.log(row.name);
                this.$confirm('此操作将永久删除该Tag, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    articleInfoService.deleteTag(row.name).then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.message
                            });
                            this.listTag();
                        }
                    });
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