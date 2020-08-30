<template>
    <div class="detail">
        <Row>
            <Col span="6"><br></Col>
            <Col span="12">
                <div v-if="articleDetail">
                    <div class="title">{{articleDetail.title}}</div>
                    <div class="info">
                        <span>作者：<span class="author">Mr.Gan</span></span>
                        <span>创建时间：{{articleDetail.create_time | time}}</span>
                        <span>点赞数：{{articleDetail.likes}}</span>
                    </div>
                    <div class="content">
                        <markdown-preview :initial-value="articleDetail.content"></markdown-preview>
                    </div>
                    <blog-thumb :article-id="articleDetail._id"></blog-thumb>
                    <blog-article-comment :article-id="articleDetail._id"></blog-article-comment>
                    <article-comment :comments="articleDetail.comments"></article-comment>
                </div>
            </Col>
            <Col span="6"></Col>
        </Row>
    </div>
</template>

<script>
    import BlogBanner from "../../components/BlogBanner";
    import BlogThumb from "../../components/BlogThumb";
    import ArticleComment from "../../components/ArticleComment";
    import BlogArticleComment from "../../components/BlogArticleComment";
    import { MarkdownPreview } from 'vue-meditor';
    import articleService from "../../api/articleService";
    export default {
        name: "ArticleDetail",
        components: {
            BlogBanner,
            BlogThumb,
            ArticleComment,
            BlogArticleComment,
            MarkdownPreview
        },
        data() {
            return {
                _id: '',
                articleDetail: {}
            }
        },
        mounted() {
            this._id = this.$route.params._id;
            this.getArticleDetail();
        },
        methods: {
            getArticleDetail() {
                articleService.getArticleDetail(this._id).then(res => {
                   this.articleDetail = res.data;
                });
            }
        },
        filters: {
            time(value) {
                return new Date(parseInt(value)).toLocaleDateString();
            }
        }
    }
</script>

<style scoped lang="less">
    .detail{
        padding-top: 20px;
        .title{
            font-size: 26px;
            font-family: Kaiti;
            font-weight: bold;
            text-align: center;
        }
        .info{
            text-align: center;
            color: #808695;
            span{
                margin: 0 15px;
                .author{
                    font-family: BarbaraHand;
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
        .content{
            margin: 15px 0;
        }
    }
</style>