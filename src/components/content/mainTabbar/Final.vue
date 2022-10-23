 <template>
    <tab-bar>
      <TabBarItem path="/home" activeColor="red">
      <template #item-img><img src="./../../../assets/img/tabbar/home.svg"></template>
      <template #item-img-active> <img src="./../../../assets/img/tabbar/home_active.svg"></template>
      <template #item-text>首页</template>
      </TabBarItem>
      <TabBarItem path="/category">
      <template #item-img><img src="./../../../assets/img/tabbar/category.svg"></template>
        <template #item-img-active> <img src="./../../../assets/img/tabbar/category_active.svg"></template>

        <template #item-text>分类</template>
      </TabBarItem>
      <TabBarItem path="/cart">
        <template #item-img><img src="./../../../assets/img/tabbar/cart.svg"></template>
        <template #item-img-active> <img src="./../../../assets/img/tabbar/cart_active.svg"></template>
        <template #item-text>购物车</template>
      </TabBarItem>
      <TabBarItem path="/profile">
        <template #item-img><img src="./../../../assets/img/tabbar/profile.svg"></template>

        <template #item-img-active> <img src="./../../../assets/img/tabbar/profile_active.svg"></template>
        <template #item-text>我的</template>
      </TabBarItem>
  </tab-bar> 
</template>

<script>
import TabBar from "./../../common/tabbar/TabBar.vue"
import TabBarItem from "./../../common/tabbar/TabBarItem.vue"
export default {
    name: "Final",
     components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style scoped>
</style>
