export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//获取医院挂号详情返回数据对象
export interface HospitalObj {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
      hostypeString: string;
      fullAddress: string;
    };
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: string;
    route: string;
    status: number;
    bookingRule: null;
  };
}

export interface HospitalDetailResponseData extends ResponseData {
  data: HospitalObj;
}

//代表医院科室的数据
export interface Department {
  depcode: string;
  depname: string;
  children?: Department[];
}

//代表存储科室数组类型
export type DepartmentArr = Department[];

//获取科室接口返回数据类型
export interface DepartmentResponseData extends ResponseData {
  data: DepartmentArr;
}

//用户登录接口需要携带参数类型
export interface LoginData {
  phone: string;
  code: string;
}

//登录接口返回用户信息数据
export interface UserInfo {
  name: string;
  token: string;
}

//登录接口返回的数据类型
export interface UserLoginResponseData extends ResponseData {
  data: UserInfo;
}

//微信登录接口返回数据ts类型
export interface WXLogin {
  redirectUri: string;
  appid: string;
  scope: string;
  state: string;
}

export interface WxloginResponseData extends ResponseData {
  data: WXLogin;
}

export interface BaseMap {
  workDateString: string;
  releaseTime: string;
  bigname: string;
  stopTime: string;
  depname: string;
  hosname: string;
}

export interface WorkData {
  workDate: string;
  workDateMd: string;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: number;
  availableNumber: number;
  status: number;
}

export type BookingScheduleList = WorkData[];

export interface HospitalWordData extends ResponseData {
  data: {
    total: number;
    bookingScheduleList: BookingScheduleList;
    baseMap: BaseMap;
  };
}

export interface Doctor {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

export type DocArr = Doctor[];

export interface DoctorResponseData extends ResponseData {
  data: DocArr;
}

//获取某一个挂号医生数据详情
export interface DoctorInfoData extends ResponseData {
  data: Doctor;
}
