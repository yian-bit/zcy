<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" class="tab-control-item"
         @click="itemClick(index)" :class="{active:index==currentIndex}">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:"TabControl",
    data(){
        return {
            currentIndex: 0
        }
    },

     props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
      
        itemClick(index) {
            this.currentIndex=index
            this.$emit('tabClick',index);
             
        }
    }
}
</script>

<style>
.tab-control {
    display: flex;
    text-align: center;
    height: 50px;
    line-height: 50px ;
    background-color: white;
    /* position: sticky; */
    /* top:36px; */
} 
.tab-control-item{
    flex: 1;
}

.active {
    color:rgb(253, 128, 149);
  
}
.active span {
  border-bottom: 3px solid rgb(253, 128, 149);
    padding: 5px;
}
</style>
