<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
    <div class="tip" style="color: #7f7f7f">
      <p>
        <el-icon><InfoFilled /></el-icon>
        完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
      </p>
    </div>
    <el-descriptions
      v-if="userInfo.authStatus == 1"
      class="margin-top"
      :column="1"
      border
      style="margin: 20px 0"
      size="small"
    >
      <el-descriptions-item label-align="center" width="30px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            用户姓名
          </div>
        </template>
        {{ userInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" width="30px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            证件类型
          </div>
        </template>
        {{ userInfo.certificatesType == "10" ? "身份证" : "户口本" }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" width="30px">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location />
            </el-icon>
            证件号码
          </div>
        </template>
        {{ userInfo.certificatesNo }}
      </el-descriptions-item>
    </el-descriptions>
    <el-form
      v-else
      style="width: 60%; margin: 20px auto"
      label-width="80"
      :model="params"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="用户姓名" prop="name">
        <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select
          placeholder="请选择证件类型"
          style="width: 100%"
          v-model="params.certificatesType"
        >
          <el-option
            :label="item.name"
            v-for="(item, index) in typeArr"
            :key="index"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input
          placeholder="请输入证件号码"
          v-model="params.certificatesNo"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传证件" prop="certificatesUrl">
        <el-upload
          ref="upload"
          action="/api/oss/file/fileUpload?fileHost=userAuth"
          list-type="picture-card"
          :limit="1"
          :on-exceed="onExceedHandler"
          :on-success="onSuccessHandler"
          :on-preview="onPreview"
        >
          <img
            style="width: 100%; height: 100%"
            src="../../../assets/images/auth_example.png"
            alt=""
          />
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            v-if="params.certificatesUrl"
            style="width: 100%; height: 100%"
            :src="params.certificatesUrl"
            alt="Preview Image"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="submit"
          >提交</el-button
        >
        <el-button size="default" @click="reset">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { InfoFilled, Plus } from "@element-plus/icons-vue";
import { reqUserInfo, reqCertificationType, reqUserAuth } from "@/api/user";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

let userInfo = ref({});
let typeArr = ref([]);
let params = reactive({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});

const dialogVisible = ref<boolean>(false);

const upload = ref();

const form = ref();

onMounted(() => {
  getUserInfo();
  getType();
});

const getUserInfo = async () => {
  let result = await reqUserInfo();
  if (result.code == 200) {
    userInfo.value = result.data;
  }
};

const getType = async () => {
  let result = await reqCertificationType();

  if (result.code == 200) {
    typeArr.value = result.data;
  }
};

const onExceedHandler = () => {
  ElMessage({
    type: "error",
    message: "最多只能上传一张图片哦~",
  });
};

const onSuccessHandler = (response: any) => {
  form.value.clearValidate("certificatesUrl");

  params.certificatesUrl = response.data;
};

const onPreview = () => {
  dialogVisible.value = true;
};

const submit = async () => {
  await form.value.validate();
  try {
    await reqUserAuth(params);
    ElMessage({
      type: "success",
      message: "认证成功",
    });
    getUserInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "认证失败，请您核对信息~",
    });
  }
};

const reset = () => {
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });
  upload.value.clearFiles();
};

const validatorName = (rule: any, value: any, callBack: any) => {
  let reg =
    /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入合法的姓名"));
  }
};

const validatorCertificatesNo = (rule: any, value: any, callBack: any) => {
  let reg =
    /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入合法的证件号码"));
  }
};

const validatorCertificatesType = (rule: any, value: any, callBack: any) => {
  if (value == "10" || value == "20") {
    callBack();
  } else {
    callBack(new Error("请选择证件类型"));
  }
};

const validatorCertificatesUrl = (rule: any, value: any, callBack: any) => {
  if (value.length) {
    callBack();
  } else {
    callBack(new Error("请上传证件照"));
  }
};

const rules = {
  name: [{ required: true, validator: validatorName }],
  certificatesNo: [{ required: true, validator: validatorCertificatesNo }],
  certificatesType: [{ required: true, validator: validatorCertificatesType }],
  certificatesUrl: [{ required: true, validator: validatorCertificatesUrl }],
};
</script>
<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<style></style>
