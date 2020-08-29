<template>
    <div class="blog_article_comment">
        <Input v-model="value"
               type="textarea"
               :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入你的评论" />
        <div class="submit_comment">
            <Button type="primary" @click="submitComment">提交评论</Button>
        </div>
    </div>
</template>

<script>
    import commentService from "../api/commentService";

    export default {
        name: "BlogArticleComment",
        props: {
            articleId: {
                type: String,
                default: ''
            }
        },
        data() {
            return{
                value: ''
            }
        },
        methods: {
            submitComment() {
                // 先判断是否登录
                if (this.$store.state.userInfo) {
                    if (this.value.trim()) {
                        commentService.submitComment({article_id: this.articleId,value: this.value}).then(res => {
                           if (res.code === 0){
                               this.value = '';
                               this.$Message.success(res.message);
                           }else{
                               this.$Message.warning(res.message);
                           }
                        });
                    }else{
                        this.$Message.warning("请输入内容");
                    }
                }else{
                    this.$Message.warning("请先登录");
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .blog_article_comment{
        margin-top: 15px;
        background-color: #fff;
        padding: 15px 10px;
        .submit_comment{
            margin-top: 15px;
            text-align: center;
        }
    }
</style>