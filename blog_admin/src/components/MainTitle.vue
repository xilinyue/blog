<template>
    <div>
        <h2>{{title}}</h2>
    </div>
</template>

<script>
    export default {
        name: "MainTitle",
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    h2{
        margin-bottom: 20px;
        text-align: center;
    }
</style>