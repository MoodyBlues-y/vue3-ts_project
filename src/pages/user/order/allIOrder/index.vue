<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <el-form inline>
      <el-form-item label="就诊人">
        <el-select
          placeholder="请选择就诊人"
          v-model="patientId"
          @change="changeUser"
        >
          <el-option label="请选择全部就诊人" value=""></el-option>
          <el-option
            v-for="item in allUser"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select placeholder="请选择就诊人" @change="changeOrderStatus">
          <el-option label="全部订单" value=""></el-option>
          <el-option
            v-for="(item, index) in allOrderStatus"
            :key="index"
            :label="item.comment"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table border style="margin: 10px 0" :data="allOrderArr">
      <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
      <el-table-column label="医院" prop="hosname"></el-table-column>
      <el-table-column label="科室" prop="depname"></el-table-column>
      <el-table-column label="医生" prop="title"></el-table-column>
      <el-table-column label="医事服务费" prop="amount"></el-table-column>
      <el-table-column label="就诊人" prop="patientName"></el-table-column>
      <el-table-column
        label="订单状态"
        prop="param.orderStatusString"
      ></el-table-column>
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button type="text" @click="goDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getOrderInfo"
    />
  </el-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  reqGetAllOrder,
  reqGetAllPatient,
  reqGetAllOrderStatusList,
} from "@/api/user";
import type {
  UserOrderInfoResponseData,
  Records,
  Order,
} from "@/api/user/type";

const $router = useRouter();
const pageNo = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(100);
const patientId = ref<string>("");
const orderStatus = ref<string>("");
const allOrderArr = ref<Records>([]);
const allUser = ref([]);
const allOrderStatus = ref<OrderStatus[]>([]);

const getOrderInfo = async (pager: number = 1) => {
  const result: UserOrderInfoResponseData = await reqGetAllOrder(
    pageNo.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  if (result.code == 200) {
    allOrderArr.value = result.data.records;
    total.value = result.data.total;
  }
};

const getAllPatient = async () => {
  const result = await reqGetAllPatient();
  if (result.code == 200) {
    allUser.value = result.data;
  }
};

const getAllOrderStatus = async () => {
  const result: UserOrderStatusResponseData = await reqGetAllOrderStatusList();
  if (result.code == 200) {
    allOrderStatus.value = result.data;
  }
};

const goDetail = (row: Order) => {
  $router.push({ path: "/user/order", query: { orderId: row.id } });
};

const handleSizeChange = (pageSizes: number) => {
  pageSize.value = pageSizes;
  getOrderInfo();
};

const changeUser = () => {
  getOrderInfo();
};

const changeOrderStatus = () => {
  getOrderInfo();
};

onMounted(() => {
  getOrderInfo();
  getAllPatient();
  getAllOrderStatus();
});
</script>
<style scoped lang="scss"></style>
