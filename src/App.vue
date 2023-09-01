<template>
  <div class="container">
    <!-- 顶部组件 -->
    <HospitalTop />
    <div class="content">
      <!-- 展示路由组件的区域 -->
      <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <HospitalBottom />
    <!-- 登录组件 -->
    <login v-if="userStore.visiable" />
  </div>
</template>
<script setup lang="ts">
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 1200px;
    margin-top: 70px;
    min-height: 700px;
  }
}
</style>
