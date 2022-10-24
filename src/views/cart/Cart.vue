
<template>
    <div class="cart">
        <NavBar class="cart_nav">
             <template #center><div class='home-bar'>购物车({{$store.state.cartList.length}})</div></template>
        </NavBar>
        <CartList />
        <CheckBottomBar />
    </div>
</template>

<script>
import NavBar from "./../../components/common/navbar/NavBar.vue"
import CartList from "./childComps/CartList.vue"
import CheckBottomBar from "./childComps/CheckBottomBar.vue"
import {mapGetters} from "vuex"
    export default {
        name: "Cart",
        components: {
            NavBar,
            CartList,
            CheckBottomBar
        },
        computed: {
            ...mapGetters(['cartLength'])
        }
    }
</script>

<style scoped>
.cart {
    height: 100vh;
}
.cart_nav{
    background-color: brown;
    color: #fff;
}
</style>