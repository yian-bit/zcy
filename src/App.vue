<template>
  <div id="app">
    <!-- 不要销毁 -->
    <!-- <router-view v-solt="{Component}">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view> -->
    <!-- <keep-alive exclude="Detail"></keep-alive> -->
    <!-- <router-view/> -->
       <router-view v-slot="{ Component }">
        <keep-alive include="Home">
          <component :is="Component"  v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component"  v-if="!$route.meta.keepAlive"/>
      </router-view> 
    <Final/> 
   
  </div> 
</template>

<script>
import Final from "./components/content/mainTabbar/Final.vue"
// import { h } from "vue";

// 自定义name的壳的集合
// const wrapperMap = new Map();

export default {
  name: 'App',
  components: {
    Final
  },

//   data() {
//     return {
//       include: [],
//     };
//   },
//   watch: {
//     $route: {
//       handler(next) {
//           // ??这个按自己业务需要，看是否需要cache页面组件

//           const index = store.list.findIndex(
//             (item) => item.fullPath === next.fullPath
//           );
//           // 如果没加入这个路由记录，则加入路由历史记录
//           if (index === -1) {
//             this.include.push(next.fullPath);
//           }
//       },
//       immediate: true,
//     },
//   },
//   methods: {
//     // 为keep-alive里的component接收的组件包上一层自定义name的壳.
//     wrap(fullPath, component) {
//       let wrapper;
//       // 重点就是这里，这个组件的名字是完全可控的，
//       // 只要自己写好逻辑，每次能找到对应的外壳组件就行，完全可以写成任何自己想要的名字.
//       // 这就能配合 keep-alive 的 include 属性可控地操作缓存.
//       const wrapperName = fullPath; 
//       if (wrapperMap.has(wrapperName)) {
//         wrapper = wrapperMap.get(wrapperName);
//       } else {
//         wrapper = {
//           name: wrapperName,
//           render() {
//             return h("div", { className: "vaf-page-wrapper" }, component);
//           },
//         };
//         wrapperMap.set(wrapperName, wrapper);
//       }
//       return h(wrapper);
//     },
//   },
};

// export default {
//   name: 'App',
//   components: {
//     Final
//   }
// }
</script>

<style scope>
@import "./assets/css/base.css";

</style>
