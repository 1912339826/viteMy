###### 中间件(脏活苦活我来干...,要确保相互独立)文件的使用说明:

Vue Mixins=>Vue3 Composition API :
https://www.jb51.net/article/185739.htm
https://blog.csdn.net/qq_45549336/article/details/111034107
简单的使用:

useXXX.js中:

```js
import {
    computed,
    ref
} from 'vue'
export function 文件名称 () {
    const count = ref(1)
    const plusOne = computed(() => count.value + 1)

    function hello() {
        console.log('hello mixin' + plusOne.value)
    }
    return {
        count,
        plusOne,
        hello
    }
}
```

.vue:

```vue
<template>
  <div @click="hello">
      点我测试
  </div>
</template>

<script>
import { useJEditableTable } from "@/use/useXXX.js";
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup() {
    const { hello } = useXXX();
    const data = reactive({});
    return {
      data,
      hello
    };
  },
});
</script>
<style scoped lang=''>
</style>
```

其上,浏览器控制台输出为:hello mixin2

js文件命名规则:use开头,首字母大写.

