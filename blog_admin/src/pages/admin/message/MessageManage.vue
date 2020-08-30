<template>
    <div class="message_manage">
        <main-title title="留言管理"></main-title>
        <el-table
                :data="messageList"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="_id"
                    label="_id">
            </el-table-column>
            <el-table-column
                    prop="user_name"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    label="时间">
                <template v-slot="scope">
                    {{scope.row.create_time | time}}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template v-slot="scope">
                    <el-button type="primary" size="mini"
                               @click="handleDialogV(scope.row.content)">详情</el-button>
                    <el-button type="danger" size="mini" @click="deleteMessage(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[5, 10, 15]"
                :page-size="5"
                layout="total, prev, pager, next,sizes"
                :total="total">
        </el-pagination>
        <el-dialog
                title="详情"
                :visible.sync="dialogVisible"
                width="50%">
            <div v-html="htmlContent"></div>
        </el-dialog>
    </div>
</template>

<script>
    import MainTitle from "../../../components/MainTitle";
    import messageService from "../../../api/messageService";
    export default {
        name: "MessageManage",
        components: {
            MainTitle
        },
        data() {
            return{
                messageList: [],
                currentPage: 1,
                skip: 1,
                limit: 5,
                total: 0,
                dialogVisible: false,
                htmlContent: ''
            }
        },
        mounted() {
            this.listMessageLazy();
            this.countMessage();
        },
        methods: {
            handleDialogV(html) {
                this.dialogVisible = true;
                this.htmlContent = html;
            },
            handleSizeChange(size) {
                this.limit = size;
                this.listMessageLazy();
            },
            handleCurrentChange(page) {
                this.skip = page;
                this.listMessageLazy();
            },
            listMessageLazy() {
                messageService.listMessageLazy(this.skip,this.limit).then(res => {
                    if (res.code === 0){
                        this.messageList = res.data;
                    }
                });
            },
            countMessage() {
                messageService.countMessage().then(res => {
                    if (res.code === 0){
                        this.total = res.data;
                    }
                });
            },
            deleteMessage(_id) {
                this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    messageService.deleteMessage(_id).then(res => {
                        if (res.code === 0){
                            this.$message({
                                type: 'success',
                                message: res.message
                            });
                            this.skip = 1;
                            this.limit = 5;
                            this.listMessageLazy();
                            this.countMessage();
                        }else{
                            this.$message({
                                type: 'danger',
                                message: res.message
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        filters: {
            time(value) {
                let date = new Date(parseInt(value));
                let y,m,d,H,M,S;
                y = date.getFullYear();
                m = date.getMonth() + 1;
                d = date.getDate();
                H = date.getHours();
                M = date.getMinutes();
                S = date.getSeconds();
                return y + '-' + m + '-' + d + ' ' + H + ':' + M + ':' + S;
            }
        }
    }
</script>

<style scoped>

</style>