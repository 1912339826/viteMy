<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.path);
</script>

<template>
  <router-view></router-view>
</template>

<style lang="less" scoped>
</style>
