<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~@/assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles"
           class="title-item"
           @click="titleClick(index)"
           :class="{isActive: index === currentIndex}">{{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data(){
      return{
        //详情页导航栏标题
        titles:['商品','参数','评论','推荐'],
        currentIndex: 0,
      }
    },
    methods:{
      //标题点击事件
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleItemClick', index)
      },
      //返回按钮点击事件  $router.back() 也可以 $router.go(-1)
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 12px;
  }
  .title-item {
    flex: 1;
  }
  .isActive {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 11px;
  }
</style>