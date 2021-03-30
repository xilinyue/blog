<template>
    <div class="swipe_add">
        <main-title title="添加轮播图"></main-title>
        <el-form ref="form"
                 label-width="100px">
            <el-form-item label="图片">
                <el-upload
                        class="face-uploader"
                        action="http://47.104.155.124:3000/api/admin/swipes/upload"
                        :show-file-list="false"
                        :on-success="handleImageSuccess"
                        :before-upload="beforeImageUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="face">
                    <i v-else class="el-icon-plus face-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    export default {
        name: "SwipeAdd",
        components: {
            MainTitle
        },
        data() {
            return{
                imageUrl: '',
            }
        },
        methods: {
            handleImageSuccess(res,file) {
                if (res.code === 0){
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.imageUrl = res.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            },
            beforeImageUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
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