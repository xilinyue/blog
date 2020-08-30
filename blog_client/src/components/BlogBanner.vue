<template>
    <Carousel
            v-model="value"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow"
            loop
            @on-click="bannerClick">
        <CarouselItem v-for="(item,index) in bannerList" :key="index">
            <div class="banner_item"
                 @mouseenter="changeSetting"
                 @mouseleave="changeSetting">
                <img :src="item.image" :alt="item.title">
            </div>
        </CarouselItem>
    </Carousel>
</template>

<script>
    export default {
        name: "BlogBanner",
        props: {
          bannerList: {
              type: Array,
              default() {
                  return []
              }
          }
        },
        data() {
            return{
                value: 0,
                setting: {
                    autoplay: true,
                    autoplaySpeed: 2500,
                    dots: 'inside',
                    radiusDot: true,
                    trigger: 'click',
                    arrow: 'hover'
                }
            }
        },
        methods: {
            changeSetting() {
                this.setting.autoplay = !this.setting.autoplay;
            },
            bannerClick(index){
                this.$router.push('/detail/' + this.bannerList[index].url);
            }
        }
    }
</script>

<style scoped lang="less">
    .banner_item{
        position: relative;
        width: 100%;
        height: 350px;
        overflow: hidden;
        cursor: pointer;
        img{
            height: 350px;
            width: 100%;
        }
    }
</style>