<template>
    <div class="recommend">
        <div v-for="item in recommends" class="recommend-item" :key="item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecommendView",
    props: {
        recommends:{
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.recommend {
    width:100%;
    display: flex;
    text-align: center;
    padding: 10px 0px 20px; 
    border-bottom: 1px solid rgb(0, 0, .9);
    }
.recommend a{
    text-decoration: none;
    color: black;
}
.recommend-item a:hover {
    color: red;
}
.recommend-item {
    flex: 1;
}
.recommend-item img {
    width: 79px;
    height: 70px;
    padding-bottom: 15px;
}
</style>