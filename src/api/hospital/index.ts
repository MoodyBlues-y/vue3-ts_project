import request from "@/utils/request";
import {
  HospitalDetailResponseData,
  DepartmentResponseData,
  LoginData,
  UserLoginResponseData,
  WxloginResponseData,
  HospitalWordData,
  DoctorResponseData,
  DoctorInfoData,
} from "./type";

//枚举地址
enum API {
  //医院预约挂号详情
  HOSPITALDETAIL_URL = "/hosp/hospital/",
  //获取科室列表
  HOSPITALDEPARTMENT_URL = "/hosp/hospital/department/",
  //获取验证码接口
  GETUSERCODE_URL = "/sms/send/",
  //用户登录接口
  USERLOGIN_URL = "/user/login",
  //微信扫码登录接口
  WXLOGIN_URL = "/user/weixin/getLoginParam/",
  //获取医院可预约科室数据
  HOSPITALBOOKINGSCHEDULE_URL = "/hosp/hospital/auth/getBookingScheduleRule/",
  //获取医院科室所对应医生
  HOSPITALDOCTOR_URL = "/hosp/hospital/auth/findScheduleList/",
  //获取就诊人信息
  HOSPITALUSER_URL = "/user/patient/auth/findAll",
  //获取挂号医生信息
  GETDOCTOR_URL = "/hosp/hospital/getSchedule/",
}

export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, HospitalDetailResponseData>(
    API.HOSPITALDETAIL_URL + `${hoscode}`
  );

export const reqHospitalDepartment = (hoscode: string) =>
  request.get<any, DepartmentResponseData>(
    API.HOSPITALDEPARTMENT_URL + `${hoscode}`
  );

export const reqGetCode = (phone: string) =>
  request.get<any, any>(API.GETUSERCODE_URL + `${phone}`);

export const reqUserLogin = (data: LoginData) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);

export const reqWxLogin = (wxRedirectUri: string) =>
  request.get<any, WxloginResponseData>(
    API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`
  );

export const reqBookingSchedule = (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) =>
  request.get<any, HospitalWordData>(
    API.HOSPITALBOOKINGSCHEDULE_URL + `${page}/${limit}/${hoscode}/${depcode}`
  );

export const reqHospitalDoctor = (
  hoscode: string,
  depcode: string,
  workDate: string
) =>
  request.get<any, DoctorResponseData>(
    API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`
  );

export const reqGetUser = () => request.get(API.HOSPITALUSER_URL);

export const reqDoctorInfo = (scheduleId: number) =>
  request.get<any, DoctorInfoData>(API.GETDOCTOR_URL + `${scheduleId}`);
