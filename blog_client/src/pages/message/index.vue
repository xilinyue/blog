<template>
    <div class="message">
        <Row>
            <Col span="6"><br></Col>
            <Col span="12">
                <blog-wang-editor @messageSubmit="messageSubmit"></blog-wang-editor>
            </Col>
            <Col span="6"></Col>
        </Row>
    </div>
</template>

<script>
    import BlogWangEditor from "../../components/BlogWangEditor";
    import messageService from "../../api/messageService";
    export default {
        name: "index",
        components: {
            BlogWangEditor
        },
        data() {
            return {
            };
        },
        mounted() {
        },
        methods: {
            messageSubmit(content){
                // 先判断是否登录
                if (this.$store.state.userInfo) {
                    if (content) {
                        messageService.submitMessage(content).then(res => {
                            if (res.code === 0){
                                window.location.reload();
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
    .message{
        padding-top: 20px;
    }
</style>