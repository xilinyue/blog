<template>
    <div class="banner_add">
        <main-title title="添加轮播图"></main-title>
        <el-form :model="form"
                 :rules="formRules"
                 ref="form"
                 label-width="100px">
            <el-form-item>
                <div class="info">!!! 图片请上传951*350的图片，以保证显示好看！上传图片之前请确保已经保存好Banner的链接ID</div>
            </el-form-item>
            <el-form-item label="图片" prop="image">
                <el-upload
                        class="face-uploader"
                        action="http://47.104.155.124:3000/api/uploadBannerImage"
                        :show-file-list="false"
                        :on-success="handleImageSuccess"
                        :before-upload="beforeImageUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="face">
                    <i v-else class="el-icon-plus face-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章_id" prop="url">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
        </el-form>
        <div class="submit_button">
            <el-button type="primary" @click="submitClick">提交</el-button>
        </div>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import bannerService from "../../../api/bannerService";
    export default {
        name: "BannerAdd",
        components: {
            MainTitle
        },
        data() {
            return{
                imageUrl: '',
                form: {
                    image: '',
                    title: '',
                    url: ''
                },
                formRules: {
                    image: [{required: true, message: '请上传图片', trigger: 'blur'}],
                    title: [{required: true, message: '请输入标题', trigger: 'blur'}],
                    url: [{required: true, message: '请输入文章_id', trigger: 'blur'}]
                }
            }
        },
        methods: {
            handleImageSuccess(res,file) {
                this.$message({
                    type: 'success',
                    message: "图片上传成功"
                });
                this.imageUrl = URL.createObjectURL(file.raw);
                this.form.image = res.imgSrc;
            },
            beforeImageUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
            },
            resetForm() {
                this.$refs['form'].resetFields();
            },
            submitClick() {
                bannerService.addBanner(this.form).then(res => {
                   if (res.code === 0){
                       this.$message({
                           type: 'success',
                           message: res.message
                       })
                   }
                   this.resetForm();
                   this.imageUrl = '';
                });
            }
        }
    }
</script>

<style scoped>
    .submit_button{
        width: 100%;
        text-align: center;
    }
    .info{
        font-size: 16px;
        color: #f60;
    }
</style>