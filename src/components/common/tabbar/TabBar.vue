<template>
  <div id="tabBar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TaBar"
  }
</script>


<style scoped>
  #tabBar {
    width: 100%;
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    background-color: var(--color-background);
    box-shadow: 0 -3px 1px rgba(100,100,100, 0.2);
  }
</style>