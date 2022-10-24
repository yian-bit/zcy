<template>
    <div id="home">
        <NavBar class="home-bar">
            <template #center><div class='home-bar'>shopping</div></template>
        </NavBar>
        <tab-control :titles='["流行","精款","精选"]' @tabClick="tabClick" class="tab-controll" ref="tabControll1" v-show="isTabFixed" />
        <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
            <recommend-view :recommends="recommends" />
            <feature-view/>
            <tab-control :titles='["流行","精款","精选"]' @tabClick="tabClick" ref="tabControll2" />
            <goods-list :goods="showItem" class="goodListItem" />
        </scroll>
        <back-top @click.native="backClick"  v-show="isShow"/>
    </div>
</template>

<script>
import NavBar from "./../../components/common/navbar/NavBar.vue"
import TabControl from "./../../components/content/tabControl/TabControl.vue"
import GoodsList from "./../../components/content/goods/GoodsList.vue"
import Scroll from "./../../components/common/scroll/Scroll.vue"
import BackTop from "./../../components/content/backTop/BackTop.vue"

import HomeSwiper from "./childComs/HomeSwiper.vue"
import RecommendView from "./childComs/RecommendView.vue"
import FeatureView from "./childComs/FeatureView.vue"

import {getHomeMultidata,RECOMMEND, BANNER,getGoods} from "./../../network/home"
import {debounce} from "./../../common/utils"
import {itemListenerMixin,backTopMixin} from "./../../common/mixin"


    export default {
        name: "Home",
        components: {
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop,
            HomeSwiper,
            RecommendView,
            FeatureView
        },
        data(){
            return {
                banners:[],
                recommends:[],
                goods:{
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]}
                },
                currentType:'pop',
                isShow:false,
                tabOffSetTop:0,
                saveY:0
            }
        },
        mixins: [itemListenerMixin,backTopMixin],
        created(){
            this.getHomeMultidata()
            this.getGoods('pop')
            this.getGoods('new')
            this.getGoods('sell')
        },
        mounted () {
            const refresh=debounce(this.$refs.scroll.refresh,100)
             this.$bus.on('itemImageLoad',()=>{
                // 滚动卡顿 refs在created里面可能拿不到值
                this.$refs.scroll.refresh();
                refresh()
            })
        },
        computed:{
            showItem(){
                return this.goods[this.currentType].list;
            }
        },
        destroyed () {
            console.log(haha);
        },
        activated () {
        //    this.$refs.scroll.scrollTo(0,-saveY,0);
           this.$refs.scroll.refresh()
        },
        deactivated () {
            // this.saveY=this.$refs.scroll.getScrollY();
            console.log(this.$refs.scroll.getScrollY())
            // console.log(saveY)
            console.log("xbb"); 
            // this.$bus.$off("itemImgLoad",this.itemImgListener)
        },
        methods:{
            // 事件
            tabClick(index){
                switch (index) {
                    case 0:
                        this.currentType='pop';
                        break;
                    case 1:
                        this.currentType='new';
                        break;
                    case 2:
                        this.currentType='sell';
                }
                this.$refs.tabControll1.currentIndex=index;    
                this.$refs.tabControll2.currentIndex=index;
            },

            // 网络请求
            getHomeMultidata(){
                    getHomeMultidata().then(res=>{
                        console.log(res);
                    this.banners = res.data[BANNER].list
                    console.log(this.banners);
                    this.recommends = res.data[RECOMMEND].list
                    console.log(this.recommends);
            })
            },
            getGoods(type){
                const page=this.goods[type].page+1;
                getGoods(type,page).then(res=>{
                    console.log(res)
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page+=1
                    console.log(this.goods['pop'].list);
                    this.$refs.scroll.finishPullUp();
                })          
             
            },
            contentScroll(position){
                this.isShow=(-position.y)>1000;
                this.listenShowBackTop(position)
            },
            // listenShowBackTop(position){
            //     this.isTabFixed=(-position.y)>this.tabOffSetTop;
            // },
            loadMore(){
                this.getGoods(this.currentType);
                this.$refs.scroll.scroll.refresh();
            },
            swiperImgLoad(){
                this.tabOffSetTop=this.$refs.tabControll2.$el.offsetTop;
            },
            backClick(){
                this.$refs.scroll.scrollTo(0,0,500);
            }
        }
    }
</script>

<style scoped>
#home { 
    position: relative;
    height: 100vh;
}
.home-bar {
    /* 局部滚动，导航不必使用fixed（脱标） */
    /* 原生滚动时使用 */
    /* left: 0px;
    top: 0px;
    right: 0px;
    position: fixed; */
    background-color: rgb(198, 90, 140); 
    color:#fff;
    /* z-index: 8; */
}
.content{
    /* 方式一：滚动区域 */
    position:absolute;
    top:44px;
    bottom:52px;
    right: 0;
    left: 0;  
    /* background-color: yellow; */
    /* z-index: 10; */
    /* 方式二：计算*/
    /* height: calc(100% - 85px); */
    overflow: hidden; 
}
.goodListItem{
    /* margin-top:60px; */
    text-align:center;
}
.tab-controll{
    position: relative;  
    z-index: 4;
}
</style>