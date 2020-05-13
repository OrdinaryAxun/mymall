<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl :title="['流行','新款','热卖']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed" class="tab-control1"/>
    <Scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <RecommendView :recommends="recommends"/>
      <FeatureView/>
      <TabControl :title="['流行','新款','热卖']" @tabClick="tabClick" ref="tabControl2"/>
      <GoodList :goods="showGoods"/>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isBackTopShow"/>
  </div>
</template>
<script>
  //注册公共组件===============================================================

  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childrenComps/HomeSwiper";
  import Scroll from "../../components/common/scroll/Scroll";
  //注册私用组件===============================================================

  import RecommendView from "./childrenComps/RecommendView";
  import FeatureView from "./childrenComps/FeatureView";
  import TabControl from '../../components/content/tabcontrol/TabControl';
  import GoodList from "../../components/content/goods/GoodList";
  import BackTop from "../../components/content/backTop/BackTop";
  //注册事件===================================================================

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/untils";
  // import {imgListener} from "../../common/mixin";

  export default {
    name: "Home",
    components:{
      Scroll,
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      BackTop
    },

    data(){
      return{
        banners: [],
        recommends: [],
        goods:{
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]}
        },
        currentType: 'pop',
        isBackTopShow: false,
        offsetTop: 0,
        isTabFixed: false,
      }
    },

    created(){
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },

    // mixins: [imgListener],

    mounted(){
      //图片完成加载的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 500);
      this.$bus.$on('homeImgLoad', () => {
        refresh()
      });
      ///////////////////////////////////////////////////////////////
      //对监听的事件进行保存
      // this.homeImgListener = () => {
      //   refresh()
      // };
      // this.$bus.$on('homeImgLoad', this.homeImgListener);
      ///////////////////////////////////////////////////////////////
    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },

    methods:{
      /*事件相关方法
      *
      */

      //切换展示商品
      tabClick(index){
          switch (index){
            case 0:
              this.currentType = 'pop';
              break;
            case 1:
              this.currentType = 'new';
              break;
            case 2:
              this.currentType = 'sell';
              break;
          }

          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;

      },
      //返回顶部
      backClick(){
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      //返回顶部组件显示
      contentScroll(position){
        //判断backTop是否显示
        this.isBackTopShow = (-position.y) > 1000;
        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.offsetTop
      },
      //上拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      //获取tabControl的offsetTop
      swiperImgLoad(){
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*网络请求相关方法
      *
      */

      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
          const page = this.goods[type].page + 1;
          getHomeGoods(type, page).then(res => {
            // console.log(res)
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;

            this.$refs.scroll.finishPullUp()
          })
      }
    },
    deactivated() {
      ///////////////////////////////////////////////////////////////
      //取消全局事件的监听
      // this.$bus.$off('homeImgLoad', this.homeImgListener)
      ///////////////////////////////////////////////////////////////
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff
  }

  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*}*/

  .tab-control1 {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>