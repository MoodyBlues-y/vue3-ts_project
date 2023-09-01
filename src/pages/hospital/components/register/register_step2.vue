<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" :icon="User" @click="goUser"
            >添加就诊人</el-button
          >
        </div>
      </template>
      <template #default>
        <div class="user">
          <Visitor
            class="item"
            v-for="(user, index) in userArr"
            :key="user.id"
            :user="user"
            @click="changeIndex(index)"
            :index="index"
            :currentIndex="currentIndex"
          />
        </div>
      </template>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" :size="size" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名</div>
          </template>
          {{ docInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医事服务费</div>
          </template>
          {{ docInfo.amount }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="btn">
      <el-button
        type="primary"
        :disabled="currentIndex == -1 ? true : false"
        @click="submitOrder"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { reqSubmitOrder } from "@/api/user";
import { SubmitOrder } from "@/api/user/type";
import { reqGetUser, reqDoctorInfo } from "@/api/hospital";
import type { DoctorInfoData, Doctor } from "@/api/hospital/type";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

let $route = useRoute();
let $router = useRouter();

let userArr = ref([]);
let docInfo = ref<Doctor>({});
let currentIndex = ref<number>(-1);

onMounted(() => {
  fetchUserData();
  fetchInfo();
});

const fetchUserData = async () => {
  let result = await reqGetUser();
  if (result.code == 200) {
    userArr.value = result.data;
  }
};

const fetchInfo = async () => {
  let result: DoctorInfoData = await reqDoctorInfo($route.query.docId);
  if (result.code == 200) {
    docInfo.value = result.data;
  }
};

const changeIndex = (index: number) => {
  currentIndex.value = index;
};

const submitOrder = async () => {
  let hoscode = docInfo.value.hoscode;
  let scheduleId = docInfo.value.id;
  let patientId = userArr.value[currentIndex.value].id;
  let result: SubmitOrder = await reqSubmitOrder(
    hoscode,
    scheduleId,
    patientId
  );
  if (result.code == 200) {
    $router.push({ path: "/user/order", query: { orderId: result.data } });
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
  }
};

const goUser = () => {
  $router.push({ path: "/user/patient", query: { type: "add" } });
};
</script>
<style scoped lang="scss">
.container {
  .tip {
    color: #7f7f7f;
    font-size: 26px;
    font-weight: 900;
  }
  .box-card {
    margin: 20px 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
}
</style>
