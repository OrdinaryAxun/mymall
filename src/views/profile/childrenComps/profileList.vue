<template>
  <div class="profile-list">
    <div class="profile-list-item">
      <img src="~@/assets/img/profile/message.svg" class="image"/>
      <span>我的消息</span>
    </div>
    <div class="profile-list-item">
      <img src="~@/assets/img/profile/pointer.svg" class="image"/>
      <span>积分商城</span>
    </div>
    <div class="profile-list-item">
      <img src="~@/assets/img/profile/vip.svg" class="image"/>
      <span style="border-bottom: 0;">会员卡</span>
    </div>
    <div class="line"></div>
    <div class="profile-list-item">
      <img src="~@/assets/img/profile/cart.svg" class="image"/>
      <span>我的购物车</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileList"
};
</script>

<style scoped>
.profile-list {
  width: 100%;
}
.profile-list-item {
  line-height: 45px;
  align-items: center;
  height: 45px;
  display: flex;
  padding-left: 20px;
}

.profile-list-item img{
  width: 30px;
  height:30px;
}

.profile-list-item span {
  font-size: 18px;
  display: inline-block;
  width: 100%;
  padding-left: 5px;
  color: #333333;
  border-bottom: 1px solid #dddddd;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}
</style>
