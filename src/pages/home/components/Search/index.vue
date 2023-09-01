<template>
  <div class="search">
    <el-autocomplete
      v-model="keyword"
      clearable
      placeholder="请输入医院名称"
      @select="goDetail"
      :fetch-suggestions="fetchData"
      :trigger-on-focus="false"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>
<script setup lang="ts">
//引入element-plus提供图标
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { reqSearchHospital } from "@/api/home";
import type { HospitalInfo } from "@/api/home/type";

//创建路由器对象
const $router = useRouter();
//搜索关键字
let keyword = ref<string>("");

const fetchData = async (keyword: string, cb: any) => {
  let result = await reqSearchHospital(keyword);
  //整理数据
  let showData = result.data.map((item) => {
    return {
      value: item.hosname, //展示医院名字
      hoscode: item.hoscode, //医院编码
    };
  });
  cb(showData);
};

//点击某一个推荐项
const goDetail = (item) => {
  console.log(item);
  $router.push({ path: "/hospital", query: { hoscode: item.hoscode } });
};

//深度选择器:>>> /deep/ ::v-deep
</script>
<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  :deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>
