<template>
    <div class="cart-bottom">
        <div class="check-bar">
            <CheckButton :is-checked="isSelectAll" class="check-content" @click.native="checkClick" />
            <span>全选</span>
        </div>
        <div class="price">合计:{{totalPrice}}</div>
        <div class="calculate">去计算:({{checkLength}})</div>
    </div>
</template>

<script>
import CheckButton from './../../../components/content/checkButton/CheckButton.vue'
import {mapGetters} from "vuex"
export default {
    name:"CheckBottomBar",
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice(){
           return this.$store.state.cartList.filter(item=>{
                return item.check
            }).reduce((pre,item)=>{
                return pre+item.price*item.count
        },0).toFixed(2)
        },
        checkLength(){
            // return this.cartList.filter(item=>item.check).length
            return this.cartList.filter(item=>{
                return item.check
                }).reduce((pre,item)=>{
                    return pre+item.count
                
            },0)
         },
         isSelectAll(){
                if(this.cartList.length===0) return false
                return !this.cartList.find(item => !item.check)
         }
    },
    methods: {
          checkClick(){
            console.log("zcy")
            if(this.isSelectAll){
                 this.cartList.forEach(item =>item.check=false);
            }else{
                this.cartList.forEach(item =>item.check=true);
            }
           
         },
          calcClick(){
            if(!this.isSelectAll){
                // this.$toast.show('请选择购买的商品',2000)
               
            }
         }
    }
}
</script>

<style scoped>
.cart-bottom {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: relative;
}
.check-bar{
    display: flex;
    width: 60px;
    align-items: center;
}
.check-content{
    height: 20px;
    width: 20px;
    line-height: 20px;
}
.price {
    flex: 1;
    text-align: center;
}
.calculate{
    width: 80px;
}
</style>