<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted } from "vue";

onMounted(() => {
  /**
   * 解决 css 引入图片在 github pages 无法获取的问题
   */
  const { NODE_ENV } = process.env;
  document.documentElement.className = NODE_ENV;
});
</script>

<template>
  <router-view></router-view>
</template>

<style lang="less" scoped>
</style>
