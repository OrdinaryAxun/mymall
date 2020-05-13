<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectAll"
                    @click.native="checkedClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:￥{{totalPrice}}
    </div>
    <div class="finalPay" @click="userPay">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/cheakButton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartListBottomBar",
    components: {CheckButton},
    data(){
      return{
        checkedAll: false
      }
    },
    computed:{
      ...mapGetters(['cartList','cartListLength']),
      totalPrice(){
        return this.cartList.filter(item => {
            return item.checked === true;
          }).reduce((prev, item) => {
            return prev + item.price * item.count;
          }, 0);
      },
      checkLength(){
        return this.cartList.filter(item => item.checked === true).length;
      },
      //全选
      isSelectAll(){
        if(this.cartList.length === 0){return false}
        //return !this.cartList.filter(item => !item.checked).length;
        //return !this.cartList.find(item => !item.checked);
        for(let item of this.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
      }
    },
    methods:{
      checkedClick(){
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked = false)
        }else{
          this.cartList.forEach(item => item.checked = true)
        }
      },
      userPay(){
        this.$Toast.toastShow('请选择购买的商品',1500)
      }
    }
  }
</script>

<style scoped>
 .cart-bottom-bar {
   width: 100%;
   height: 50px;
   line-height: 50px;
   position: fixed;
   display: flex;

   font-size: 15px;
   align-items: center;

   right: 0;
   left: 0;
   bottom: 49px;
   border-top: 1px solid #cccccc;
 }
 .check-content {
   display: flex;
   width: 20%;
   height: 50px;
   line-height: 12px;
   padding-left: 5px;
   font-size: 15px;
   align-items: center;
 }
 .check-content span {
   padding-left: 3px;
 }

  .price {
    width: 60%;
    text-align: center;
  }
 .check-content,.price {
   background-color: #f2f5f8;
 }
  .finalPay {
    width: 20%;
    height: 49px;
    color: #ffffff;

    margin-bottom: 2px;
    background-color: red;
    text-align: center;
    align-items: center;
  }
</style>