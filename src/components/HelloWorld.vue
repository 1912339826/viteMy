<script setup>
defineProps({
  //相当于之前的props
  msg: String,
});
import { ref } from "vue";
const con = ref(0);
</script>
<template>
  <p @click="con++">{{ con }}</p>
  <p>{{ msg }}</p>
</template>
<style scoped lang='less'>
</style>