<template>
    <div class="comment">
        <List class="comment_list" border item-layout="vertical">
            <ListItem v-for="item in comments" :key="item._id">
                <ListItemMeta :avatar="item.avator"
                              :title="item.user_name"
                              :description="item.content" />
                <template slot="action">
                    <li>
                        {{item.create_time | time}}
                    </li>
                </template>
            </ListItem>
        </List>
    </div>
</template>

<script>
    export default {
        name: "ArticleComment",
        props: {
            comments: {
                type: Array,
                default() {
                    return []
                }
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

<style scoped lang="less">
    .comment{
        margin-top: 15px;
        background-color: #fff;
        .comment_list{
            border: none;
        }
    }
</style>