<template>
  <div class="goods-item" @click="goToDetail">
      <img  :src="showImg" alt="" @load="imageLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">¥{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
</template>

<script>
export default {
    name: "GoodsListItem",
    props:{
    goodsItem:{
          type: Object,
            default(){
                return {}
            }
          }
    },
    computed: {
        showImg(){
          // this.goodsItem.image必须放到前面
          return  this.goodsItem.image || this.goodsItem.show.img 
        }
    },
    methods: {
      imageLoad(){
        this.$bus.emit("itemImageLoad")
      },
      goToDetail(){
        this.$router.push("/detail/"+this.goodsItem.iid)
      }
    }
}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 49%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    /* 文字一行显示，多余用点表示 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: red;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("./../../../assets/img/common/collect.svg") 0 0/14px 14px;  
  }
</style>
