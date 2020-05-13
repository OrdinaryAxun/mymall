<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center"><b>我的主页</b></div>
    </nav-bar>
    <login/>
    <money/>
    <profile-list/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Login from "./childrenComps/Login";
  import Money from "./childrenComps/Money";
  import ProfileList from "./childrenComps/profileList";
  export default {
    name: "Profile",
    components: {ProfileList, Money, Login, NavBar}
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>