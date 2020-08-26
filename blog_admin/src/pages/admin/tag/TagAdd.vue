<template>
    <div class="tag_add">
        <main-title title="添加标签"></main-title>
        <el-form :model="addTagForm" :rules="addTagFormRules" ref="addTagForm"
                 label-width="100px">
            <el-form-item label="标签名称" prop="name">
                <el-input v-model="addTagForm.name"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="addTagSubmit">提交</el-button>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import articleInfoService from "../../../api/articleInfoService";
    export default {
        name: "TagAdd",
        components: {
            MainTitle
        },
        data() {
            return{
                addTagForm: {
                    name: ''
                },
                addTagFormRules: {
                    name: [{required: true, message: '名称必须', trigger: 'blur'}]
                }
            }
        },
        methods: {
            addTagSubmit() {
                this.$refs['addTagForm'].validate((valid) => {
                    if (valid) {
                        articleInfoService.addTag(this.addTagForm).then(res => {
                           if (res.code === 0){
                               this.$message({
                                   type: 'success',
                                   message: res.message
                               });
                           }else if (res.code === 1){
                               this.$message({
                                   type: 'warning',
                                   message: res.message
                               });
                           }
                            this.addTagForm.name = '';
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs['addTagForm'].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>