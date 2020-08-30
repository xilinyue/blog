<template>
    <div class="wang_editor">
        <div ref="message" class="message_editor"></div>
        <div class="submit_button">
            <Button type="primary" size="large" @click="messageSubmit">提交留言</Button>
        </div>
    </div>
</template>

<script>
    import E from "wangeditor";
    export default {
        name: "BlogWangEditor",
        data() {
            return {
                editorContent: ""
            };
        },
        mounted() {
            var editor = new E(this.$refs.message);
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            };
            editor.create();
            document.getElementsByClassName("w-e-text-container")[0].style.height = 600 + 'px';
        },
        methods: {
            messageSubmit() {
                this.$emit("messageSubmit",this.editorContent);
            }
        }
    }
</script>

<style scoped lang="less">
    .wang_editor{
        height: calc(100vh - 120px);
        background-color: #fff;
        .submit_button {
            padding-top: 15px;
            padding-bottom: 15px;
            text-align: center;
        }
    }
</style>