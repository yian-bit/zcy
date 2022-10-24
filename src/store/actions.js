
// export {
//     ADD_COUNTER,
//     ADD_TO_CART
// } from "./mutation-type"

import { reject, resolve } from "core-js/fn/promise"

export default {

    addCart(context,payload){
        return new Promise((resolve,reject)=>{
            let oldProduct=context.state.cartList.find(item=>item.id==payload.id)
            if(oldProduct){
                context.commit("add_counter",oldProduct)
                resolve('当前的商品数量加1')
            }else{
                payload.count=1
                context.commit("add_to_cart",payload)
                resolve('添加了新的商品')
            }
        })
       
    }
} 