<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button
          class="button"
          type="primary"
          :icon="User"
          @click="addPatient"
          >添加就诊人</el-button
        >
      </div>
    </template>
    <div class="form" v-if="scene == 1">
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请您输入就诊人姓名"
            v-model="patientParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请您选择证件的类型"
            style="width: 100%"
            v-model="patientParams.certificatesType"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="item in certationTypeArr"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            placeholder="请您输入证件号码"
            v-model="patientParams.certificatesNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="patientParams.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="patientParams.birthdate"
            type="date"
            placeholder="请您选择出生日期"
            :size="size"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请您输入手机号码"
            v-model="patientParams.phone"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"
        >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
      >
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="婚姻状态">
          <el-radio-group v-model="patientParams.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="patientParams.isInsure">
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
          <el-cascader :props="props" v-model="patientParams.addressSelected" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            placeholder="请您输入详细地址"
            v-model="patientParams.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <el-form style="width: 60%; margin: 10px auto" label-width="80">
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请您输入用户姓名"
            v-model="patientParams.contactsName"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请您选择证件的类型"
            style="width: 100%"
            v-model="patientParams.contactsCertificatesType"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="item in certationTypeArr"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            placeholder="请您输入证件号码"
            v-model="patientParams.contactsCertificatesNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请您输入手机号码"
            v-model="patientParams.contactsPhone"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="submit"
            >提交</el-button
          >
          <el-button type="primary" size="default" @click="reset()"
            >重写</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="visitors" v-else>
      <Visitor
        class="item"
        v-for="(user, index) in userArr"
        :key="user.id"
        :user="user"
        :index="index"
        @changeScene="changeScene"
        @getAllUser="getAllUser"
      />
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { reqGetUser } from "@/api/hospital";
import {
  reqCertificationType,
  reqCity,
  reqAddOrUpdatePatient,
} from "@/api/user";
import type { AddOrUpdatePatient } from "@/api/user/type";
import { CascaderProps, ElMessage } from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

let $route = useRoute();
let $router = useRouter();

let scene = ref<number>(0);

let userArr = ref([]);
let certationTypeArr = ref([]);

let patientParams = reactive<AddOrUpdatePatient>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
});
onMounted(() => {
  getAllUser();
  getCertationType();
  if ($route.query.type == "add") {
    scene.value = 1;
  }
  if ($route.query.type == "edit") {
    scene.value = 1;
  }
});

const getAllUser = async () => {
  const result = await reqGetUser();
  if (result.code == 200) {
    userArr.value = result.data;
  }
};

const addPatient = () => {
  reset();
  scene.value = 1;
};

const reset = () => {
  Object.assign(patientParams, {
    id: null,
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  });
};

const changeScene = (user: AddOrUpdatePatient) => {
  scene.value = 1;
  Object.assign(patientParams, user);
};

const getCertationType = async () => {
  const result = await reqCertificationType();
  if (result.code == 200) {
    certationTypeArr.value = result.data;
  }
};

const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const result = await reqCity(node.data.id || "86");
    let showData = result.data.map((item) => {
      return {
        id: item.id,
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren,
      };
    });
    resolve(showData);
  },
};

const submit = async () => {
  try {
    await reqAddOrUpdatePatient(patientParams);
    ElMessage({
      type: "success",
      message: patientParams.id ? "更新成功" : "新增成功",
    });
    scene.value = 0;
    if ($route.query.type) {
      $router.back();
    } else {
      scene.value = 0;
    }
    getAllUser();
  } catch (error) {
    ElMessage({
      type: "error",
      message: patientParams.id ? "更新失败" : "新增失败",
    });
  }
};

watch(
  () => userArr.value,
  () => {
    let user = userArr.value.find((item) => {
      return item.id == $route.query.id;
    });

    Object.assign(patientParams, user);
  }
);
</script>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visitors {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 32%;
    margin: 5px;
  }
}
</style>
