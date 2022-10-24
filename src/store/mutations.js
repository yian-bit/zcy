
// export {
//     ADD_COUNTER,
//     ADD_TO_CART
// } from "./mutation-type"

export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每一个方法尽可能完成的事件比较单一一点
    add_counter(state,payload){
        payload.count++
    },
    add_to_cart(state,payload){
        payload.check=true
        state.cartList.push(payload)
    }
}