<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll: null,
      }
    },
    mounted(){
      //1,创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType, // 0,1 不侦测实时位置; 2 在手指滚动过程中实时侦测; 3 只要是滚动都侦测
        pullUpLoad: this.pullUpLoad,
      });
      //2,监听BScroll事件
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      });
      //3,监听上拉加载更多
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      scrollTo(x, y , time){
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>