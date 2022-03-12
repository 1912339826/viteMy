<script setup>
import { Icon, Button, ConfigProvider } from 'vant';
import { ref, onMounted } from "vue";
import anime from "animejs";
const con = ref(0);
const themeVars = {
  rateIconFullColor: '#07c160',
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackgroundColor: '#07c160',
  buttonPrimaryBorderColor: '#07c160',
  buttonPrimaryBackgroundColor: '#07c160',
};
onMounted(() => {
  anime({
    targets: ".loop",
    translateX: 270,
    loop: 3,
    easing: "easeInOutSine",
  });

  anime({
    targets: ".loop-infinity",
    translateX: 270,
    loop: true,
    easing: "easeInOutSine",
  });

  anime({
    targets: ".loop-reverse",
    translateX: 270,
    loop: 3,
    direction: "reverse",
    easing: "easeInOutSine",
  });

  anime({
    targets: ".loop-reverse-infinity",
    translateX: 270,
    direction: "reverse",
    loop: true,
    easing: "easeInOutSine",
  });

  anime({
    targets: ".loop-alternate",
    translateX: 270,
    loop: 3,
    direction: "alternate",
    easing: "easeInOutSine",
  });

  anime({
    targets: ".loop-alternate-infinity",
    translateX: 270,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
  });
});
</script>
<template>
  <ConfigProvider :theme-vars="themeVars">
    <Button type="primary">主要按钮</Button>
  </ConfigProvider>

  <p @click="con++">{{ con }}</p>
  <article>
    <div class="loop">1</div>
    <div class="loop-infinity">2</div>
    <div class="loop-reverse">3</div>
    <div class="loop-reverse-infinity">4</div>
    <div class="loop-alternate">5</div>
    <div class="loop-alternate-infinity">6</div>
  </article>
</template>
<style scoped lang='less'>
article {
  div {
    display: flex;
    flex-direction: column;
    width: 100px;
  }
}
</style>