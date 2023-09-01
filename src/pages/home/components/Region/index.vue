<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <ul>
        <li :class="{ active: activeFlag == '' }" @click="all">全部</li>
        <li
          v-for="item in regionList"
          :key="item.value"
          :class="{ active: activeFlag === item.value }"
          @click="changeActive(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reqHospitalLevelAndRegion } from "@/api/home";
import {
  HospitalLevelAndRegionResponseData,
  HospitalLevelAndRegionArr,
} from "@/api/home/type";
import { onMounted, ref } from "vue";

//存储等级数据
let regionList = ref<HospitalLevelAndRegionArr>([]);
//标识当前激活的类
let activeFlag = ref<string>("");

onMounted(() => {
  getRegion();
});

const getRegion = async () => {
  let result: HospitalLevelAndRegionResponseData =
    await reqHospitalLevelAndRegion("beijin");
  if (result.code == 200) {
    regionList.value = result.data;
  }
};

//点击高亮效果回调
const changeActive = (val: string) => {
  activeFlag.value = val;
  $emit("getRegion", val);
};

//全部的回调
const all = () => {
  activeFlag.value = "";
  $emit("getRegion", "");
};

let $emit = defineEmits(["getRegion"]);
</script>
<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 10px;
  .content {
    display: flex;
    .left {
      width: 38px;
      margin-right: 10px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 10px;
        margin-bottom: 10px;
        &.active {
          color: #55a6fe;
        }
        &:hover {
          cursor: pointer;
          color: #55a6fe;
        }
      }
    }
  }
}
</style>
