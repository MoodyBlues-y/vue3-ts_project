<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="detail">挂号详情</div>
      </template>
      <div class="top">
        <el-tag class="ml-2" type="success">
          <div class="tag">
            <svg
              t="1690519351935"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3119"
              width="16"
              height="16"
            >
              <path
                d="M870.76 153c-39.36-23.1-56.6-11.38-91.12 17.36a2033.39 2033.39 0 0 0-181.53 171.79c-32.75 35-62.43 72.78-95.58 107.39-11.39 11.89-63.5 76.9-77.68 77.61-27.65 1.4-105-153.1-111.58-164.62-47-81.66-147.71-23.53-206.72 24.91-39.45 32.38-52 51.26-35.38 97.76 17.49 48.9 53.2 99.28 91 143.27 41.41 75.63 95 147.47 145 203.53 93.43 104.83 159.61 30.11 236.39-58.15 125.41-144.16 262-278.72 387.77-421.78 61.15-69.55 16.79-153.65-60.57-199.07z m-39.15 208c-12.38 12.43-24.51 25.16-36.72 37.81-0.5-17.25-4-33.48-13.54-46.55-3.89-5.3-12.84-0.27-9 5.24 9.95 14.11 12.2 32.94 11.29 52.86q-34.66 36.22-68.73 73.1c2.1-8.83 3.14-18 5.35-27.22 4.33-18 12.76-34.19 14.31-52.93 0.66-8-11.49-7.76-12.32 0-1.89 17.49-10.69 32.53-15.15 49.3-4 15-4.58 30.22-12.17 44.17a6.21 6.21 0 0 0 0.84 7.65c-15 16.43-30.18 32.68-45 49.27 2.44-27.17 10.63-53.76 12.58-81.19 0.38-5.32-7.87-5.28-8.27 0-2.42 31.54-13.5 61.9-15.23 93.33q-35.72 40.28-70.85 80.94c-1.27 1.47-2.55 3.13-3.82 4.65 1.6-6.33 3.21-12.63 4.61-18.92 5.66-25.32 11.47-50.52 18.93-75.38 2.17-7.23-9-10.25-11.26-3.1-9 28.3-15.57 57.08-22.63 85.88-3 12.14-6.53 24.06-9.24 36.1-28.94 37.77-59.37 81.27-94.15 107.6a147.18 147.18 0 0 1-18.85 12.24c-7.64-22.62 14-52.14 16.58-74.21 0.57-4.94-8.08-6.16-8.76-1.19-3.33 24.22-28.15 55.37-17.6 80.1-39.32 16.37-71.21-0.6-102.45-35.6 5.43-40.13 12.66-79.4 24.24-118.41 1.4-4.73-5.83-6.66-7.35-2-11.71 35.63-20.91 72.2-26.35 109.34-14.93-18.34-30.7-37.48-46.57-57 4.23-33.35 8.84-66.18 17.6-98.83 1.14-4.24-5.38-6-6.57-1.81-8.23 29.36-15.63 59.41-19.88 89.74-1.84-2.29-3.67-4.48-5.51-6.79 6-8.6 7-20.47-2.56-30.06-5.85-5.85-11.57-12.21-17.36-18.35 4.75-34.62 21.2-67.12 17.89-102.82-0.45-4.91-8.09-5.05-7.78 0 2 32.13-14.17 61.31-20.46 91.88-11.56-12.78-22.85-26-33.4-39.85a5.9 5.9 0 0 0 1.11-2c12-39.16 23.54-78.18 26.91-119.17 0.52-6.27-9.12-6.16-9.73 0-3.73 37.88-14.88 74-26.52 110-17.43-24.27-32.62-50-43.37-77-25.28-63.57 10.55-69 70.31-98.35-0.36 0.17 38.66-17 38.23-17.07 24.94 3.91 52.87 66.94 65.58 85.36 20.67 30 43.78 80.79 73.77 103 43.86 32.41 66.47 8.18 99.2-24.26 83.66-82.93 156.26-175.29 242.07-256.24 33.29-31.41 81.65-90.73 129.9-69.42C936.6 251.25 867 325.52 831.61 361z"
                fill="#333333"
                p-id="3120"
              ></path>
              <path
                d="M379.79 658.18c-1.13-5.54-9.48-3.17-8.44 2.33 8.26 43.85 2.32 85.86-8.48 128.7-1.9 7.52 9.92 10.71 11.57 3.19 9.78-44.71 14.56-88.97 5.35-134.22z"
                fill="#333333"
                p-id="3121"
              ></path></svg
            ><span>{{ orderInfo.param?.orderStatusString }}</span>
          </div>
        </el-tag>
        <div class="right_info">
          <img src="../../../../assets/images/code_app.png" alt="" />
          <div class="info">
            <p>微信 关注 “北京114预约挂号”</p>
            <p>“快速预约挂号”</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <el-descriptions class="margin-top" :column="1" :size="size" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊人信息</div>
              </template>
              {{ orderInfo.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊日期</div>
              </template>
              {{ orderInfo.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院</div>
              </template>
              {{ orderInfo.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室</div>
              </template>
              {{ orderInfo.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称</div>
              </template>
              {{ orderInfo.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医事服务费</div>
              </template>
              <span style="color: red">{{ orderInfo.amount }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号单号</div>
              </template>
              {{ orderInfo.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间</div>
              </template>
              {{ orderInfo.createTime }}
            </el-descriptions-item>
          </el-descriptions>
          <div
            class="btn"
            v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1"
          >
            <el-popconfirm title="确定取消预约吗?" @confirm="cancel">
              <template #reference>
                <el-button size="default">取消预约</el-button>
              </template>
            </el-popconfirm>
            <el-button
              type="primary"
              size="default"
              v-if="orderInfo.orderStatus == 0"
              @click="openDialog"
              >支付</el-button
            >
          </div>
        </div>
        <div class="right">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>注意事项</span>
              </div>
            </template>
            <p>锦带杂花钿，罗衣垂绿川。</p>
            <p style="color: red">
              需在{{ orderInfo.fetchTime }}前在医院取号问子今何去，出采江南莲。
            </p>
            <p>
              需在{{ orderInfo.quitTime }}前在医院退号问子今何去，出采江南莲。
            </p>
            <p>愿君早旋返，及此荷花鲜。</p>
          </el-card>
        </div>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogTableVisible"
      title="微信支付"
      width="400"
      @close="close"
    >
      <div class="qrcode">
        <img :src="imgUrl" alt="" />
        <p>请使用微信扫一扫</p>
        <p>扫描二维码支付</p>
      </div>
      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog"
          >关闭窗口</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
//生成二维码插件
//@ts-ignore
import QrCode from "qrcode";
import {
  reqOrderInfo,
  reqCancelOrder,
  reqQrCode,
  reqQueryPayState,
} from "@/api/user";
import {
  OrderInfoResponseData,
  OrderInfo,
  PayInfo,
  PayResult,
} from "@/api/user/type";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

let $route = useRoute();
let orderInfo = ref<any>({});
let dialogTableVisible = ref<boolean>(false);
let imgUrl = ref<string>("");
let timer = ref<any>();

onMounted(() => {
  getOrderInfo();
});

const getOrderInfo = async () => {
  let result: OrderInfoResponseData = await reqOrderInfo($route.query.orderId);

  if (result.code == 200) {
    orderInfo.value = result.data;
  }
};

const cancel = async () => {
  try {
    await reqCancelOrder($route.query.orderId as string);
    ElMessage({
      type: "success",
      message: "取消预约成功",
    });
    getOrderInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "取消预约失败",
    });
  }
};

const openDialog = async () => {
  dialogTableVisible.value = true;
  let result: QrCode = await reqQrCode($route.query.orderId);
  imgUrl.value = await QrCode.toDataURL(result.data.codeUrl);
  timer.value = setInterval(async () => {
    let result2: PayResult = await reqQueryPayState($route.query.orderId);
    if (result2.data) {
      dialogTableVisible.value = false;
      ElMessage({
        type: "success",
        message: "支付成功",
      });
      clearInterval(timer.value);
      getOrderInfo();
    }
  }, 2000);
};

const closeDialog = () => {
  dialogTableVisible.value = false;
  clearInterval(timer.value);
};

const close = () => {
  clearInterval(timer.value);
};
</script>
<style scoped lang="scss">
.box-card {
  .detail {
    color: #7f7f7f;
    font-weight: 900;
  }
  .top {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .tag {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-left: 5px;
      }
    }
    .right_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
      }
      .info {
        margin-left: 10px;
        p {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
  .bottom {
    display: flex;
    margin-top: 20px;
    .left {
      flex: 4;
      .btn {
        margin: 10px 0;
      }
    }
    .right {
      margin-left: 20px;
      flex: 6;
      p {
        line-height: 30px;
      }
    }
  }
}

::v-deep(.el-dialog__body) {
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
}

.qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    line-height: 30px;
  }
}
</style>
