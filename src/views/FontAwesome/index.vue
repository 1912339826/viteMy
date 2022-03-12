<script setup>
import { ref } from "vue";
const con = ref(0);
const value1 = ref();
</script>
<template>
  <p @click="con++">{{ con }}</p>
  <pre>
    <i class="fa fa-camera-retro"></i>
  </pre>
</template>
<style scoped lang='scss'>
</style>