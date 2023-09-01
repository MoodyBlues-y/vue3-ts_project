<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul class="hospital">
        <li :class="{ active: activeFlag == '' }" @click="all">全部</li>
        <li
          v-for="item in levelList"
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
let levelList = ref<HospitalLevelAndRegionArr>([]);
//标识当前激活的类
let activeFlag = ref<string>("");

onMounted(() => {
  getLevel();
});

const getLevel = async () => {
  let result: HospitalLevelAndRegionResponseData =
    await reqHospitalLevelAndRegion("HosType");
  if (result.code == 200) {
    levelList.value = result.data;
  }
};

//点击高亮效果回调
const changeActive = (val: string) => {
  activeFlag.value = val;
  //触发父组件给予的自定义事件并把val传过去
  $emit("pushLevel", val);
};

//全部的回调
const all = () => {
  activeFlag.value = "";
  $emit("pushLevel", "");
};

let $emit = defineEmits(["pushLevel"]);
</script>
<style scoped lang="scss">
.level {
  color: #7f7f7f;
  h1 {
    font-weight: 990;
    margin: 10px 0;
  }
  .content {
    display: flex;
    .left {
      margin-right: 10px;
    }
    .hospital {
      display: flex;
      li {
        margin-right: 10px;
        &.active {
          color: #55a6fe;
        }
        &:hover {
          color: #55a6fe;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
