<template>
  <div class="detail-bottom">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="cartClick">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods:{
      cartClick(){
        this.$emit('cartClick')
      }
    }
  }
</script>

<style scoped>
  .detail-bottom {
    height: 49px;
    background-color: #fff;

    position: relative;
    /*bottom: 49px;*/

    display: flex;
    text-align: center;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left {
    width: 60%;

  }
  .bar-left .text{
    font-size: 13px;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 2px;
    background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service{
    background-position: 0 -54px;
  }
  .bar-left .shop {
    background-position: 0 -98px;
  }
  .bar-right {
    width: 40%;
    font-size: 15px;
    color: #fff;
    line-height: 49px;
  }
  .bar-right .cart {
    background-color: #ffe87c;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>