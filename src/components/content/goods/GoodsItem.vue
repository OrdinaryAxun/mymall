<template>
  <div class="goodsItem" @click="itemClick">
    <img :src="showImg" @load="imgLoad">
    <div class="goodsInfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    props:{
      goodsItem:{
        type: Object,
        default(){
          return{}
        }
      }
    },
    computed:{
      showImg(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imgLoad(){
        if(this.$route.path.indexOf('/home')){
          this.$bus.$emit('homeImgLoad')
        }else if(this.$route.path.indexOf('/detail')){
          this.$bus.$emit('detailImgLoad')
        }
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goodsItem {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }
  .goodsItem img {
    width: 100%;
    border-radius: 5px;
  }
  .goodsInfo {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right:0;
    overflow: hidden;
    text-align: center;
  }
  .goodsInfo p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goodsItem .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goodsItem .collect {
    position: relative;
  }
  .goodsItem .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>