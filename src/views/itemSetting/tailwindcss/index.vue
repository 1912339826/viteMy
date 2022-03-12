<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { routes } from "../../../router/index.js";
const con = ref(0);
const activeIndex2 = ref("1");
const data = reactive({
  routes: [],
});

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
onMounted(() => {
  nextTick(() => {
    data.routes = routes;
  });
});
</script>
<template>
  <!-- 项目自定义tailwindcss样式 -->
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <template v-for="(item, index) in data.routes" :key="index">
      <el-sub-menu :index="index + ''" v-if="item.children.length > 0">
        <template #title v-if="item.children || item.children.length > 0">{{
          item.meta.title
        }}</template>
        <template
          v-for="(itemChildrenLV1, indexLV1) in item.children"
          :key="index - indexLV1 + ''"
        >
          <el-menu-item :index="index - indexLV1 + ''">{{
            itemChildrenLV1.meta.title
          }}</el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item :index="index + ''" v-else>{{
        item.meta.title
      }}</el-menu-item>
    </template>
  </el-menu>
</template>
<style scoped lang='less'>

</style>