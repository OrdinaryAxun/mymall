<template>
    <Swiper class="d-swiper">
      <Swiper-item v-for="item in swiperImages">
        <img :src="item">
      </Swiper-item>
    </Swiper>
</template>

<script>
  import Swiper from "../../../components/common/swiper/Swiper";
  import SwiperItem from "../../../components/common/swiper/SwiperItem";

  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      swiperImages:{
        type: Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .d-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>