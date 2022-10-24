<template>
<div class="goods">
  <goods-list-item v-for="item in goods" :key="item" :goodsItem="item" />
</div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue"
export default {
    name: "GoodsList",
    components: {
        GoodsListItem
    },
    props:{
        goods :{
            type: Array,
            default(){
                return []
            }
        }
      
    }
}
</script>

<style scoped>
.goods{
    display: flex;
    /* 子元素要给个宽度 */
    /* 均等分。两边加起来等于中间部分 */
    justify-content: space-around;
    /* 包裹，换行 */
    flex-wrap: wrap;
    padding: 5px;
}
</style>
