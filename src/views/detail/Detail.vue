<template>
    <div class="detail">
        <DtailNavBar class="detail-nav-bar" @titleItem="titleItem" ref="nav" />
        <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <div v-for="item in $store.state.cartList" :key="item">
                {{$store.state.cartList.length}}
            </div>
            <DetailSwiper :topImages="topImages" />
            <DetailBaseInfo :goods="goodsInfo" />
            <DetailShopInfo :shop="shop" />
            <DetailGoodsInfo :detailInfo="detailInfo" @detailImgLoad="detailImgLoad" />
            <DetailParamInfo :paramInfo="paramInfo" ref="params" />
            <DetailCommentInfo ref="comment" :comment-info="commentInfo" />
            <!-- <DetailRecommendInfo :commentInfo="recommendList"/> -->
            <GoodsList :goods="recommendList" ref="recommend" />
        </Scroll>
        <DetailBottomBar @addCart="addToCart" />
        <back-top @click.native="backClick"  v-show="isShow"/>
    </div>
</template>

<script>
import DtailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from "./childComps/DetailRecommendInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"
import BackTop from "./../../components/content/backTop/BackTop.vue"

import Scroll from "./../../components/common/scroll/Scroll.vue"
import GoodsList from"./../../components/content/goods/GoodsList.vue"

import {detailDate,Goods,Shop,GoodsParam,getRecommend} from "./../../network/detail"
import {itemListenerMixin,backTopMixin} from "./../../common/mixin"
import {debounce} from "./../../common/utils"
import {mapActions} from 'vuex'

export default {
    name:"Detail",
    data(){
        return {
            id :null,
            topImages:[],
            goodsInfo:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommendList:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            isShow:false,
        }
    },
    mixins: [itemListenerMixin,backTopMixin],
    components: {
        DtailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        // DetailRecommendInfo,
        Scroll,
        GoodsList,
        BackTop
    },
    destroyed () {
        // this.$bus.$off("itemImgLoad",this.itemImgListener)
    },
    created () {
        this.id=this.$route.params.iid
          
          detailDate(this.id).then(res=>{
            const data=res.result;
            console.log(data);
            // 获取轮播图的数据
            this.topImages=data.itemInfo.topImages
            // 创建商品的对象
            this.goodsInfo=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            
            // 获取店铺信息
            this.shop=new Shop(data.shopInfo)
            // 获取商品信息
            this.detailInfo = data.detailInfo
            // 参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
           // 评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
        getRecommend().then(res => {
          this.recommendList = res.data.list
          console.log(this.recommendList)
        })
        this.getThemeTopY=debounce(()=>{
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
               console.log(this.themeTopYs.length)
        },5000)
    },
    methods: {
        ...mapActions(['addCart']),
        detailImgLoad(){
            // this.newRefresh()
             this.getThemeTopY();
        },
        titleItem(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])
        },
        contentScroll(position){
            const positionY=-position.y
            for(let i=0;i<this.themeTopYs.length-1;i++){
                 if(this.currentIndex!==i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
                    this.currentIndex=i
                    this.$refs.nav.currentIndex=this.currentIndex
                 }
            }
            this.isShow=(-position.y)>1000;
            this.listenShowBackTop(position)
        },
        // listenShowBackTop(position){
        //         this.isTabFixed=(-position.y)>this.tabOffSetTop;
        // },
        backClick(){
                this.$refs.scroll.scrollTo(0,0,500);
        },
        addToCart(){
            const product={}
            product.image=this.topImages[0];
            product.title=this.goodsInfo.title;
            product.desc=this.goodsInfo.desc;
            product.price=this.goodsInfo.nowPrice;
            product.id=this.id;
            this.$store.dispatch('addCart',product).then(res=>{
            //    utils.showToast({tiele:"标题"})
            })
            // this.addCart(product).then(res=>{
            //     console.log(res);
                    // this.$toast.show(res,2000)
            // })

        }

    }
}
</script>

<style scoped>
.detail {
    height: 100vh;
    /* 覆盖下面tab-bar区域 */
    position: relative;
    z-index: 1;
}
.content {
    /* position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;  */
    height: calc(100% - 44px - 56px);
    background-color: white;
    overflow: hidden; 
}
.detail-nav-bar {
    position: relative;
    z-index: 1;
    background-color: #fff;
}
</style>
