<template>
  <span>获取验证码({{ time }}s)</span>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

let time = ref<number>(5);

//监听flag变化
watch(
  props.flag,
  () => {
    //开启定时器
    let timer = setInterval(() => {
      time.value--;
      if (time.value < 1) {
        $emit("getFlag", false);
        clearInterval(timer);
      }
    }, 1000);
  },
  {
    immediate: true,
  }
);

let props = defineProps(["flag"]);
let $emit = defineEmits(["getFlag"]);
</script>
<style scoped lang="scss"></style>
