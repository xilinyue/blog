<template>
    <div class="article_add">
        <h2>{{id === '0' ? '文章添加' : '文章编辑'}}</h2>
        <el-form :model="articleAddForm"
                 :rules="articleAddRules"
                 ref="articleAddForm"
                 label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="articleAddForm.title"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="summary">
                <el-input type="textarea"
                          :rows="2" v-model="articleAddForm.summary"></el-input>
            </el-form-item>
            <el-form-item label="置顶">
                <el-switch
                        v-model="articleAddForm.isRecommend"
                        active-color="#13ce66">
                </el-switch>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="articleAddForm.content"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-input v-model="articleAddForm.image"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" size="mini" @click="submitPost">提交</el-button>
    </div>
</template>

<script>
    import articleService from "../../../api/articleService";
    export default {
        name: "ArticleAdd",
        data() {
            return{
                id: '',
                articleAddForm: {
                    title: '',
                    summary: '',
                    content: '',
                    image: '',
                    isRecommend: false
                },
                articleAddRules: {
                    title: []
                }
            }
        },
        mounted() {
            this.id = this.$route.params.id;
        },
        methods: {
            submitPost() {
                articleService.articleAdd(this.articleAddForm).then(res => {
                   console.log(res);
                });
            }
        }
    }
</script>

<style scoped>

</style>