<template>
  <div id="detail">
    <Detail-nav-bar class="detail-nav" @titleItemClick="titleItemClick" ref='nav'/>
    <scroll class="content"
            ref="detailScroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :swiper-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :s-shop-info="shopInfo"/>
      <detail-goods-info :s-goods-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :s-params-info="paramsInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <good-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @cartClick="addToCart"/>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailNavBar from "./childrenComps/DetailNavBar";
  import DetailSwiper from "./childrenComps/DetailSwiper";
  import DetailBaseInfo from "./childrenComps/DetailBaseInfo";
  import DetailShopInfo from "./childrenComps/DetailShopInfo";
  import DetailGoodsInfo from "./childrenComps/DetailGoodsInfo";
  import DetailParamInfo from "./childrenComps/DetailParamInfo";
  import DetailCommentInfo from "./childrenComps/DetailCommentInfo";
  import GoodList from "../../components/content/goods/GoodList";
  import DetailBottomBar from "./childrenComps/DetailBottomBar";


  import {getDetail, GoodsInfo, ShopInfo, GoodsParams, getRecommends} from "../../network/detail";
  import {debounce} from "../../common/untils";

  export default {
    name: "Detail",
    components:{
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      DetailBottomBar,
    },
    data(){
      return{
        iid: null,
        topImages: [],  //顶部轮播图
        goods: {},      //商品描述
        shopInfo: {},   //商家信息
        detailInfo: {},  //图片详情
        paramsInfo: {},  //商品参数
        commentInfo: {}, //用户评论
        recommends: [],  //推荐商品
        themeTopYs: [], //商品,参数,评论,推荐的 offsetTop 值
        getThemeTopY: null,

      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid;

      //2.根据iid请求数据
      getDetail(this.iid).then(res => {
        //分离数据
        const data = res.result;
        //1.获取顶部的轮播图图片
        this.topImages = data.itemInfo.topImages;
        //2.获取商品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
        //3.获取商家信息
        this.shopInfo = new ShopInfo(data.shopInfo);
        //4.保存商品详细信息
        this.detailInfo = data.detailInfo;
        //5.获取参数信息
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);
        //6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }

        //3.取出并保存 offsetTop 的数据
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        },100);

        // this.$nextTick(() => {
        //   //取出并保存 offsetTop 的数据
        //   this.themeTopY = [];
        //   this.themeTopY.push(0);
        //   this.themeTopY.push(this.$refs.param.$el.offsetTop);
        //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopY);
        // })

      });
      //4.请求推荐数据
      getRecommends().then(res => {
        this.recommends = res.data.list;
      });
    },
    methods:{
      //图片加载完成事件
      imageLoad(){
        this.$refs.detailScroll.refresh();
        this.getThemeTopY()
      },
      //导航栏点击事件
      titleItemClick(index){
        this.$refs.detailScroll.scrollTo(0, -(this.themeTopY[index]), 100)
      },
      //监听滚动事件
      contentScroll(position){
        //获取y的值
        let positionY = -position.y;
        //将y的值与主题的值进行比较
        let length = this.themeTopYs.length;
        for(let i = 0; i < length; i++){
          //判断i小于长度
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))){
            this.$refs.nav.currentIndex = i;

          }
        }
      },
      //监听加入购物车
      addToCart(){
        //1获取购物车所需的商品信息
        const product = {
          image: this.topImages[0],
          title: this.goods.title,
          desc: this.goods.desc,
          price: this.goods.realPrice,
          iid: this.iid,
        };

        //2将商品信息添加到购物车
        //mutations 发送事件commit
        //action 发送事件 dispatch
        this.$store.dispatch('addCart', product).then(res => {
          this.$Toast.toastShow(res, 1500)
        })
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.detailScroll.refresh, 500);
      this.$bus.$on('detailImgLoad',() => {
        refresh()
      });
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    width: 100%;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>