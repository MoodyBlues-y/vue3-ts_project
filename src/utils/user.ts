export const SET_TOKEN = (userInfo) => {
  localStorage.setItem("userInfo", userInfo);
};

export const GET_TOKEN = () => {
  return localStorage.getItem("userInfo");
};

export const REMOVE_TOKEN = () => {
  localStorage.removeItem("userInfo");
};
