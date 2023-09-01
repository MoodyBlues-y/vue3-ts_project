import request from "@/utils/request";
import {
  SubmitOrder,
  OrderInfoResponseData,
  QrCode,
  PayResult,
  UserParams,
  UserOrderInfoResponseData,
  UserOrderStatusResponseData,
} from "./type";

//枚举地址
enum API {
  SUBMITORDER_URL = "/order/orderInfo/auth/submitOrder/",
  GETORDERINFO_URL = "/order/orderInfo/auth/getOrderInfo/",
  ORDERCANCEL_URL = "/order/orderInfo/auth/cancelOrder/",
  QRCODE_URL = "/order/weixin/createNative/",
  PAYRESULT_URL = "/order/weixin/queryPayStatus/",
  USERINFO_URL = "/user/auth/getUserInfo",
  CERTIFICATIONTYPE_URL = "/cmn/dict/findByDictCode/",
  USERAUTH_URL = "/user/auth/userAuah",
  ALLORDER_URL = "/order/orderInfo/auth/",
  FINDALLPATIENT_URL = "/user/patient/auth/findAll",
  GETALLORDERSTATUSLIST_URL = "/order/orderInfo/auth/getStatusList",
  CITY_URL = "/cmn/dict/findByParentId/",
  ADDPATIENT_URL = "/user/patient/auth/save",
  UPDATEPATIENT_URL = "/user/patient/auth/update",
  DELETEPATIENT_URL = "/user/patient/auth/remove/",
}

export const reqSubmitOrder = (
  hoscode: string,
  scheduleId: string,
  patientId: long
) =>
  request.post<any, SubmitOrder>(
    API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`
  );

export const reqOrderInfo = (id: string) =>
  request.get<any, OrderInfoResponseData>(API.GETORDERINFO_URL + id);

export const reqCancelOrder = (orderId: string) =>
  request.get<any, any>(API.ORDERCANCEL_URL + orderId);

export const reqQrCode = (orderId: string) =>
  request.get<any, QrCode>(API.QRCODE_URL + orderId);

export const reqQueryPayState = (orderId: string) =>
  request.get<any, PayResult>(API.PAYRESULT_URL + orderId);

export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL);

export const reqCertificationType = (CertificatesType = "CertificatesType") =>
  request.get<any, any>(API.CERTIFICATIONTYPE_URL + CertificatesType);

export const reqUserAuth = (data: UserParams) =>
  request.post<any, any>(API.USERAUTH_URL, data);

export const reqGetAllOrder = (
  page: number,
  limit: number,
  patientId: string,
  orderStatus: string
) => {
  request.get<any, UserOrderInfoResponseData>(
    API.ALLORDER_URL +
      `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`
  );
};

export const reqGetAllPatient = () => {
  request.get<any, any>(API.FINDALLPATIENT_URL);
};

export const reqGetAllOrderStatusList = () => {
  request.get<any, UserOrderStatusResponseData>(API.GETALLORDERSTATUSLIST_URL);
};

export const reqCity = (parentId: string) =>
  request.get<any, any>(API.CITY_URL + parentId);

export const reqAddOrUpdatePatient = (data) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEPATIENT_URL, data);
  } else {
    return request.post<any, any>(API.ADDPATIENT_URL, data);
  }
};

export const deletePatient = (id: string) =>
  request.delete<any, any>(API.DELETEPATIENT_URL + id);
