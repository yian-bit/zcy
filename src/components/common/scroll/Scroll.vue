<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

    export default {
        name:"Scroll",
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad: {
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                scroll:null

            }  
        },
        mounted(){
            console.log(this.$refs.wrapper);
            this.scroll=new BScroll(document.querySelector('.wrapper'),{
                click:true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,
                mouseWheel: true,
            })
            // this.scroll.scrollTo(0,0);
            // 监听滚动的位置
            this.scroll.on("scroll",(position)=>{
                this.$emit("scroll",position);
            })
            // 监听上拉事件
            this.scroll.on("pullingUp",()=>{
                this.$emit("pullingUp");
            })
        },
        methods:{
            scrollTo(x,y,time=300){
                this.scroll && this.scroll.scrollTo(x,y,time);
            },
            finishPullUp(){ 
                 this.scroll && this.scroll.finishPullUp();
            },
            refresh(){
                 this.scroll && this.scroll.refresh();
            },
            getScrollY(){
                return this.scroll ? this.scroll.y:0;
            }
        }

    }
</script>


<style  scoped>
</style>