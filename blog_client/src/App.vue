<template>
  <div id="app">
    <Layout>
      <blog-header></blog-header>
      <Content class="content">
        <router-view></router-view>
      </Content>
<!--      <Footer>Footer</Footer>-->
    </Layout>
  </div>
</template>

<script>
import BlogHeader from "./components/BlogHeader";
export default {
  name: 'App',
  components: {
    BlogHeader
  }
}
</script>

<style lang="less">
  @import "assets/css/reset.css";
  @import "assets/css/font.css";
  .content{
    padding-bottom: 20px;
  }
</style>
