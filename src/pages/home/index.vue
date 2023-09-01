<template>
  <div>
    <Carousel />
    <Search />
    <div class="bottom">
      <el-row gutter="20">
        <el-col :span="20">
          <Level @pushLevel="getLevel" />
          <Region @getRegion="getRegion" />
          <!-- 医院的结构 -->
          <div class="hospital" v-if="hospitalArr.length > 0">
            <Card
              class="item"
              :hospitalInfo="item"
              v-for="item in hospitalArr"
              :key="item.id"
            />
          </div>
          <el-empty v-else description="没有医院" />
          <!-- 分页器结构 -->
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[10, 20, 30, 40]"
            :small="small"
            :disabled="disabled"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="getHospital"
          />
        </el-col>
        <el-col :span="4">
          <Tip />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqHospitalData } from "@/api/home";
import { Content, HospitalResponseData } from "@/api/home/type";
import Carousel from "./components/Carousel/index.vue";
import Search from "./components/Search/index.vue";
import Level from "./components/Level/index.vue";
import Region from "./components/Region/index.vue";
import Card from "./components/Card/index.vue";
import Tip from "./components/Tip/index.vue";

let pageNo = ref<number>(1);
let limit = ref<number>(10);
let total = ref<number>(100);
//存储医院数据
let hospitalArr = ref<Content>([]);
//存储用户选的等级
let hostype = ref<string>("");
//存储用户选的地区
let districtCode = ref<string>("");

//组件挂载完毕
onMounted(() => {
  getHospital();
});

//获取医院的数据
const getHospital = async () => {
  let result: HospitalResponseData = await reqHospitalData(
    pageNo.value,
    limit.value,
    hostype.value,
    districtCode.value
  );
  if (result.code == 200) {
    hospitalArr.value = result.data.content;
    total.value = result.data.totalElements;
  }
};

//每页限制多少条数据发生变化
const handleSizeChange = () => {
  pageNo.value = 1;
  getHospital();
};

//获取用户选择的level
const getLevel = (level: string) => {
  hostype.value = level;
  getHospital();
};

//获取用户选择的code
const getRegion = (code: string) => {
  districtCode.value = code;
  getHospital();
};
</script>
<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0;
  }
}
</style>
