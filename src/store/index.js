import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations: {
    //*唯一目的修改state里的状态,并且可以被追踪*//
    addCounter(state, payload){
      payload.count++;
    },
    addTtoCart(state, payload){
      payload.checked = true;
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        //判断商品是否重复
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
        // for(let item of context.state.cartList){
        //   if(item.iid === payload.iid){
        //     oldProduct = item;
        //   }
        // }
        //重复商品数量加1，没有重复则等于1
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct);
          resolve('当前商品数量加1');
        } else {
          payload.count = 1;
          context.commit('addTtoCart', payload);
          resolve('添加新的商品');
        }
      })
    }
  },
  getters:{
    cartLength(state){
      return state.cartList.length;
    },
    cartList(state){
      return state.cartList;
    }
  },
  modules: {
  }
})
