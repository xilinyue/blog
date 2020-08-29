<template>
    <!--点赞-->
    <div class="thumb">
        <Icon type="ios-thumbs-up-outline" @click="submitThumb"/>
    </div>
</template>

<script>
    import articleService from "../api/articleService";

    export default {
        name: "BlogThumb",
        props: {
          articleId: {
              type: String,
              default: ''
          }
        },
        methods: {
            submitThumb() {
                articleService.likeArticle(this.articleId).then(res => {
                   if (res.code === 0){
                       this.$Message.success(res.message);
                   }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .thumb{
        text-align: center;
        background-color: #fff;
        font-size: 40px;
        .ivu-icon{
            cursor: pointer;
            border-radius: 50%;
            &:hover{
                box-shadow: 0 0 10px rgba(0,0,0,.3);
            }
        }
    }
</style>