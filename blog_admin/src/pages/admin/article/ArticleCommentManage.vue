<template>
    <div class="article_comment_manage">
        <main-title title="评论管理"></main-title>
        <div class="desc">通过文章_id搜索文章评论进行管理</div>
        <el-row>
            <el-col :span="6">
                <el-input v-model="articleId" placeholder="请输入文章_id"></el-input>
            </el-col>
            <el-col :span="18">
                <el-button type="primary" class="search" @click="getArticleComment">搜索</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="articleComments"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    label="#"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="内容"
                    prop="content">
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="user_name"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="时间" width="180">
                <template v-slot="scope">
                    {{scope.row.create_time}}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180"
                    align="center">
                <template v-slot="scope">
                    <el-button type="danger" size="mini" @click="deleteArticleComment(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import articleService from "../../../api/articleService";
    export default {
        name: "ArticleComment",
        components: {
            MainTitle
        },
        data() {
            return{
                articleId: '',
                articleComments: []
            }
        },
        methods: {
            getArticleComment() {
                if (this.articleId.trim()){
                    articleService.getArticleComment(this.articleId).then(res => {
                        if (res.code === 0){
                            this.articleComments = res.data.comments;
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    })
                }else{
                    this.$message({
                        type: 'warning',
                        message: "请输入文章_id"
                    });
                }
            },
            deleteArticleComment(row) {
                this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    articleService.deleteArticleComment(this.articleId,row._id).then(res => {
                       if (res.code === 0){
                           this.$message({
                               type: 'success',
                               message: res.message
                           });
                           this.getArticleComment();
                       } else{
                           this.$message({
                               type: 'error',
                               message: res.message
                           });
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
    .article_comment_manage{
        /*width: 100%;*/
        padding-left: 80px;
    }
    .desc{
        color: #ccc;
        font-size: 16px;
        margin-bottom: 20px;
    }
    .search{
        margin-left: 10px;
    }
    .el-table{
        margin-top: 15px;
    }
</style>