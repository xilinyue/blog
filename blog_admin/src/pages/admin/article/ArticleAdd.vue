<template>
    <div class="article_add">
        <main-title :title="title"></main-title>
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
            <el-form-item label="标签" prop="tag">
                <el-select v-model="articleAddForm.tag" placeholder="请选择类型">
                    <el-option
                            v-for="(item,index) in tags"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="置顶">
                <el-switch
                        v-model="articleAddForm.isRecommend"
                        active-color="#13ce66">
                </el-switch>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <markdown v-model="articleAddForm.content"></markdown>
            </el-form-item>
            <el-form-item label="封面" prop="image">
                <el-upload
                        class="face-uploader"
                        action="http://localhost:3000/api/uploadArticleFace"
                        :show-file-list="false"
                        :on-success="handleImageSuccess"
                        :before-upload="beforeImageUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="face">
                    <i v-else class="el-icon-plus face-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitPost">提交</el-button>
    </div>
</template>

<script>
    import Markdown from 'vue-meditor';
    import MainTitle from "../../../components/MainTitle";
    import articleService from "../../../api/articleService";
    import articleInfoService from "../../../api/articleInfoService";
    export default {
        name: "ArticleAdd",
        components: {
            MainTitle,
            Markdown
        },
        data() {
            return{
                id: '',
                imageUrl: '',
                tags: '',
                articleAddForm: {
                    title: '',
                    summary: '',
                    tag: '',
                    content: '',
                    image: '',
                    isRecommend: false
                },
                articleAddRules: {
                    title: [{required: true, message: '请填写博客标题', trigger: 'blur'}],
                    summary: [{required: true, message: '请填写博客概括', trigger: 'blur'}],
                    tag: [{required: true, message: '请选择博客标签', trigger: 'change'}],
                    content: [{required: true, message: '请输入博客内容', trigger: 'blur'}],
                    image: [{required: true, message: '请上传封面图片', trigger: 'blur'}]
                }
            }
        },
        computed: {
            title() {
                return this.id === '0' ? '添加文章' : '编辑文章';
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.getArticleTags();
        },
        methods: {
            handleImageSuccess(res,file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.articleAddForm.image = res.imgSrc;
            },
            beforeImageUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            getArticleTags() {
                articleInfoService.listTag().then(res => {
                    this.tags = res.data.tags;
                });
            },
            submitPost() {
                this.$refs.articleAddForm.validate(valid => {
                    if (valid){
                        //判断是新增还是编辑
                        // if (this.id === "0"){
                        //     //新增
                        //     this.addMove()
                        // }else{
                        //     //编辑
                        //     this.editMove();
                        // }

                        articleService.articleAdd(this.articleAddForm).then(res => {
                           console.log(res);
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
</style>