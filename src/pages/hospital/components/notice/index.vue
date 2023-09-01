<template>
  <div class="notice">
    <h1 class="hosname">
      {{ hospitalStore.hospitalInfo.hospital?.hosname }}挂号须知
    </h1>
    <div class="top">社区服务纷纷为规范是无法慰安妇慰安妇</div>
    <div class="info">
      <div class="tip">一、预约实名制</div>
      <div class="text">发放数个过过若若若若若若若若若</div>
    </div>
    <div class="info">
      <div class="tip">二、预约挂号</div>
      <div class="text">发放数个过过若若若若若若若若若</div>
    </div>
    <div class="info">
      <div class="tip">三、取消预约</div>
      <div class="text">发放数个过过若若若若若若若若若</div>
    </div>
    <div class="info">
      <div class="tip">四、爽约处理</div>
      <div class="text">发放数个过过若若若若若若若若若</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";

let hospitalStore = useDetailStore();
</script>
<style scoped lang="scss">
.notice {
  .hosname {
    text-align: center;
    font-size: 26px;
  }
  .top {
    color: #7f7f7f;
    margin: 10px 0;
  }
  .info {
    .tip {
      color: red;
      font-weight: 900;
    }
    .text {
      color: #7f7f7f;
      margin: 10px 0;
      line-height: 30px;
    }
  }
}
</style>
