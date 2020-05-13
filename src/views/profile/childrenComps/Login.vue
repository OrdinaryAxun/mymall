<template>
  <div class="login">
    <div class="user-pic">
      <img src="~@/assets/img/profile/avatar.svg">
    </div>
    <div class="user-info">
      <span>登录/注册</span>
      <div class="user-iph">
        <img src="~@/assets/img/profile/phone.svg">
        <span>暂未绑定手机</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login"
  }
</script>

<style scoped>
  .login {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 90px;
    padding: 0 20px;
    background-color: firebrick;
    border-top: 5px solid rgba(0,0,0,0.1);
  }

  .user-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .user-pic img{
    display: block;
    width: 60px;
    height: 60px;
  }

  .user-info {
    font-size: 16px;
    margin-left: 20px;
    color: white;
  }

  .user-info span:last-child {
    margin-left: 3px;
  }

  .user-info .user-iph {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  .user-iph img{
    display: inline-block;
    width: 16px;
    height: 16px;
  }
</style>