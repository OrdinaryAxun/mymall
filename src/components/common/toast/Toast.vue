<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    // props:{
    //   message:{
    //     type: String,
    //     default: ''
    //   },
    //   isShow:{
    //     type: Boolean,
    //     default: false
    //   },
    // },
    data(){
      return{
        message: '',
        isShow: false
      }
    },
    methods:{
      toastShow(message, duration=2000){
        this.isShow = true;
        this.message = message;

        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%, -50%);

    z-index: 999;

    position: fixed;
    color: #ffffff;
    background-color: rgba(0,0,0,0.4);
  }
</style>