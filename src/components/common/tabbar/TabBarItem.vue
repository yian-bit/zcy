<template>
        <div class="tab-bar-item" @click="itemClick">
          <div v-if="!isActive"><slot name="item-img"></slot></div>
          <div v-else><slot name="item-img-active"></slot></div>
          <div :style="activeStyle"><slot name="item-text"></slot></div>
        </div>
</template>

<script>
import { useRouter } from 'vue-router'
 export default {
    name: "TabBarltem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: "red"
      }
    },
    data() {
      return {
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle() {
        return this.isActive ?{color: this.activeColor}:{}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    padding-top: 3px;
  }
  .tab-bar-item /deep/img {
    width: 20px;
    height: 20px;
  }
</style>
