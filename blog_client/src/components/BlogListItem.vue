<template>
    <div class="blog_list_item" @click="itemClick(item._id)">
        <ListItem
                size="large"
                :key="item._id"
                class="item">
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
    </div>
</template>

<script>
    export default {
        name: "BlogListItem",
        props: {
            item: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            itemClick(_id){
                console.log(_id);
                this.$router.push("/detail/" + _id);
            }
        }
    }
</script>

<style scoped lang="less">
    .item{
        position: relative;
        box-shadow: 0 0 5px rgba(0,0,0,.1);
        background-color: #fff;
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
        img{
            height: 200px;
        }
    }
</style>