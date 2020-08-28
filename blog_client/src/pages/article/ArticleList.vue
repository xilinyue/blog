<template>
    <div class="article_list">
        <Row>
            <Col span="6" class="tag_select">
                <br>
            </Col>
            <Col span="12">
                <div class="banner">
                    <blog-banner :banner-list="bannerList"></blog-banner>
                </div>

                <Dropdown class="tags_select"
                          trigger="click"
                          @on-click="changeTag">
                    <Button class="select_button">
                        选择分类
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem
                                v-for="(item,index) in tags"
                                :key="index"
                                :name="item">{{item}}</DropdownItem>
                    </DropdownMenu>
                    <Button style="margin-left: 10px" type="primary" ghost>{{currentTag}}</Button>
                </Dropdown>

                <List item-layout="vertical" border class="item_list">
                    <ListItem v-for="item in articleList" size="large" :key="item._id" class="item">
                        <ListItemMeta :title="item.title" :description="item.create_time" />
                        {{ item.summary }}
                        <template slot="action">
                            <li class="thumb">
                                <Icon type="ios-thumbs-up-outline" /> {{item.likes}}
                            </li>
                        </template>
                        <template slot="extra">
                            <img :src="item.image" style="width: 280px">
                        </template>
                    </ListItem>
                </List>

                <div class="no_article" v-if="articleList.length === 0">
                    暂无数据
                </div>

                <Page :total="articleTotal"
                      :page-size="5"
                      show-total
                      @on-change="pageChange" />
            </Col>
            <Col span="6"></Col>
        </Row>
    </div>
</template>

<script>
    import BlogBanner from "../../components/BlogBanner";
    import bannerService from "../../api/bannerService";
    import articleService from "../../api/articleService";
    import articleInfoService from "../../api/articleInfoService";
    export default {
        name: "ArticleList",
        components: {
            BlogBanner
        },
        data() {
            return{
                bannerList: [],
                articleList: [],
                options: {
                    tag: '全部',
                    page: 1,
                    num: 5
                },
                tags: [],
                articleTotal: 0,
                currentTag: '全部'
            }
        },
        mounted() {
            this.getBannerList();
            this.getArticleListLazy();
            this.getArticleInfo();
        },
        methods: {
            changeTag(name) {
                this.currentTag = name;
                this.options.tag = name;
                this.getArticleListLazy();
                this.getCurrentArticleTotal();
            },
            getCurrentArticleTotal() {
                articleService.getCurrentArticleTotal(this.currentTag).then(res => {
                   if (res.code === 0){
                       this.articleTotal = res.data;
                   }
                });
            },
            pageChange(page) {
                this.options.page = page;
                this.getArticleListLazy();
            },
            getArticleInfo() {
                articleInfoService.listTag().then(res => {
                   if (res.code === 0){
                       this.tags = res.data.tags;
                       this.tags.unshift('全部');
                       this.articleTotal = res.data.num;
                   }
                });
            },
            getBannerList() {
                bannerService.getBannerList().then(res => {
                   if (res.code === 0){
                       this.bannerList = res.data;
                   }
                });
            },
            getArticleListLazy() {
                articleService.getArticleListLazy(this.options).then(res => {
                    if (res.code === 0){
                        let list = res.data;
                        this.articleList = list.map(item => {
                            item.create_time = new Date(parseInt(item.create_time)).toLocaleTimeString();
                            return item;
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .article_list{
        padding-top: 10px;
        .banner{
            margin-bottom: 15px;
        }
        .tags_select{
            margin-bottom: 15px;
        }
        .item_list{
            /*background-color: #fff;*/
            border: none;
            .item{
                position: relative;
                box-shadow: 0 0 5px rgba(0,0,0,.1);
                margin-bottom: 15px;
                cursor: pointer;
                &:hover{
                    box-shadow: 0 0 10px #fff;
                }
                .thumb{
                    position: absolute;
                    left: 24px;
                    bottom: 12px;
                }
            }
            img{
                height: 200px;
            }
        }
        .no_article{
            text-align: center;
            padding: 100px 0;
        }
    }
</style>