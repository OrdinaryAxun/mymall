<template>
  <div class="detail-goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{sGoodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div :key="index" v-for="(item, index) in sGoodsInfo.detailImage" class="info-list">
      <div class="info-key">{{item.key}}</div>
      <div class="info-image">
        <img v-for="(image, imgIndex) in item.list"
             :key="imgIndex"
             :src="image"
             @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    data(){
      return{
        counter: 0,
        imagesLength: 0
      }
    },
    props:{
      sGoodsInfo:{
        type: Object,
        default(){
          return{}
        }
      }
    },
    methods:{
      imgLoad(){
        if(++this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    },
    watch:{
      sGoodsInfo(){
        this.imagesLength = this.sGoodsInfo.detailImage[0].list.length
      }
    },
  }
</script>

<style scoped>
  .detail-goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  /********************************************************************************************/
  .info-desc {
    padding: 0 15px;
  }
  .info-desc .start,
  .info-desc .end {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before,
  .info-desc .end::after {
    position: absolute;
    bottom: 0;
    width: 5px;
    height: 5px;
    content: "";
    background-color: #333333;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .desc {
    font-size: 14px;
    padding: 15px 0;
  }
  .info-key {
    font-size: 15px;
    margin: 10px 0 10px 15px;
    color: #333333;
  }
  .info-list {
    margin: 0;
  }
  .info-image img {
    width: 100%;
  }
/***********************************************************************************************/
</style>