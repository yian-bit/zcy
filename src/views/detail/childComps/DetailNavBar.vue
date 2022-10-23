<template>
    <div>
        <NavBar>
            <template #left>
                <div @click="backTag" class="back-tag">
                    <img src="./../../../assets/img/common/back.svg" alt="">
                </div>
            </template>
           
                <template #center>
                     <div  class="title">
                        <!-- v-for可以遍历数组，对象，数字 -->
                    <div v-for="(item,index) in title" :class="{active:index===currentIndex}" 
                    :key="item" class="title-item" @click="titleItem(index)" >
                        {{item}}
                    </div>
                     </div>
                </template>
           
             
        </NavBar>
    </div>
</template>

<script>
import NavBar from"./../../../components/common/navbar/NavBar.vue"
export default {
    name:"DtailNavBar",
    components: {
        NavBar
    },
    data(){
        return {
            title:["商品","参数","评论","推荐"],
            currentIndex:0
        }
    },
    methods: {
        titleItem(index){
            this.currentIndex=index
            this.$emit('titleItem', index);
        },
        backTag(){
            this.$router.back();
        }
    }
}
</script>

<style scoped>
.title {
    display: flex;
}
.title-item {
    flex: 1;
}
.active {
    color: rgb(211, 20, 36);
}
.back-tag {
    margin-top: 7px;
}
</style>
