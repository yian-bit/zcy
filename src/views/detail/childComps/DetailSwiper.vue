<template>
        <swiper class="detai-swiper">
            <swiper-item v-for="item in topImages" :key="item">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "./../../../components/common/swiper/index"
    export default {
        name:"DetailSwiper",
        props:{
            topImages:{
                type: Array,
                default(){
                    return []
                }
            }
        },
        components: {
            Swiper,
            SwiperItem
        }
    }
</script>

<style scoped>
.detai-swiper {
    height: 350px;
}
</style>