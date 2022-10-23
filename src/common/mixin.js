import {POP, NEW, SELL} from "./const";
import {debounce} from "./utils";
export const itemListenerMixin={
  components: {
    
  },
  methods:{

  },
  data(){
    return {
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted () {
    // this.refresh=debounce(this.$refs.scroll.refresh,100)
    // this.itemImgListener=()=>{
    //   this.refresh()
    // }
    // this.$bus.on('itemImageLoad',this.itemImgListener)
    console.log("mixin")
  }
}

export const backTopMixin = {
  data() {
    return {
      isTabFixed:false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    // 不能抽取方法(methods)里面的内容
    listenShowBackTop(position) {
      this.isTabFixed=(-position.y)>this.tabOffSetTop;
    }
  },
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
