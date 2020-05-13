<template>
  <div id="cart">
    <nav-bar class="nav-bar">
        <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
    <cart-list-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childrenComps/CartList";
  import CartListBottomBar from "./childrenComps/CartBottomBar";
//mapGetters 将getters 映射成方法
  import {mapGetters} from 'vuex';
  export default {
    name: "Cart",
    components:{
      CartListBottomBar,
      NavBar,
      CartList
    },
    computed:{
      // cartLength(){
      //   return this.$store.state.cartList.length;
      // }

      //两种语法(数组， 对象 对象写法可起任意名)
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>