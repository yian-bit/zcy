import Vue from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'
const routerHistory=createWebHashHistory()
import Cart from './../views/cart/Cart.vue'
import Home from './../views/home/Home.vue'
import Category from './../views/category/Category.vue'
import Profile from './../views/profile/Profile.vue'
import Detail from './../views/detail/Detail.vue'

// Vue.use(Router)
var routes=[
  {
    path: "",
    redirect: "/home",
    name:"home",
    meta: {
      keepAlive:true
  }
  },
  {
    path: "/home",
    name:"home",
    component: Home,
    meta: {
      keepAlive:true
  }
  },
  {
    path: "/cart",
    name:"Cart",
    meta: {
      keepAlive:true
  },
    component: Cart
  },
  {
    path: "/category",
    name:"category",
    meta: {
      keepAlive:true
  },
    component: Category
  },
  {
    path: "/profile",
    name:"profile",
    meta: {
      keepAlive:true
  },
    component: Profile
  },
  {
    path:"/detail/:iid",
    name:"detail",
    meta: {
      keepAlive:true
   },
    component: Detail

  }
]
export const router = createRouter({
  history: routerHistory,
  mode: "history",
  routes: routes
})