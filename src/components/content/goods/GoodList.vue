<template>
  <div class="good-list">
    <goods-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsItem from "./GoodsItem";

  export default {
    name: "GoodList",
    props:{
      goods:{
        type: Array,
        default(){
          return []
        }
      }
    },
    components:{
      GoodsItem
    },
  }
</script>

<style scoped>
  .good-list {
    padding-top: 15px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>