<template>
    <div class="article_manage">
        <main-title title="文章管理"></main-title>
<!--        <div class="tag">-->
<!--            <span>选择标签</span>-->
<!--            <el-select v-model="options.tag"-->
<!--                       @change="tagChange"-->
<!--                       placeholder="请选择标签">-->
<!--                <el-option-->
<!--                        v-for="(item,index) in tags"-->
<!--                        :key="index"-->
<!--                        :label="item"-->
<!--                        :value="item">-->
<!--                </el-option>-->
<!--            </el-select>-->
<!--        </div>-->
        <el-table
                :data="articleList"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="#"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="_id"
                    label="_id"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="标签"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="200">
                <template v-slot="scope">
                    {{scope.row.create_time | time}}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="300">
                <template v-slot="scope">
                    <el-button type="primary" size="mini" @click="editArticle(scope.row)">修改</el-button>
                    <el-button type="danger" size="mini" @click="deleteArticle(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="options.page"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next"
                :total="totalNum">
        </el-pagination>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import articleService from "../../../api/articleService";
    import articleInfoService from "../../../api/articleInfoService";
    export default {
        name: "ArticleManage",
        components: {
            MainTitle
        },
        data() {
            return {
                articleList: [],
                options: {
                    tag: '',
                    page: 1,
                    num: 5
                },
                totalNum: 0,
                tags: []
            }
        },
        mounted() {
            this.getArticleList();
            this.getArticleTotalNum();
        },
        methods: {
            editArticle(row) {
                console.log(row);
            },
            deleteArticle(row) {
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    articleService.deleteArticleById(row._id).then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.message
                            });
                            this.options = {
                                tag: '',
                                page: 1,
                                num: 5
                            };
                            this.getArticleList();
                            this.getArticleTotalNum();
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
            },
            getArticleList() {
                articleService.getArticleListLazy(this.options).then(res => {
                   if (res.code === 0){
                       this.articleList = res.data;
                   }
                });
            },
            getArticleTotalNum() {
                articleInfoService.listTag().then(res => {
                    this.totalNum = res.data.num;
                    // this.tags = res.data.tags;
                });
            },
            handleSizeChange(num) {
                this.options.num = num;
                this.getArticleList();
            },
            handleCurrentChange(page) {
                this.options.page = page;
                this.getArticleList();
            }
            // ,tagChange(tag) {
            //     this.options.tag = tag;
            //     this.getArticleList();
            // }
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
    /*.tag{*/
    /*    margin-bottom: 15px;*/
    /*}*/
    /*.tag span{*/
    /*    font-weight: 400;*/
    /*    font-size: 16px;*/
    /*    margin-right: 10px;*/
    /*}*/
</style>