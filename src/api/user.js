import axiosClient from "./axiosClient";

const UserApi = {
  updateInfo: (userInfo) => {
    const url = "/user/info";
    return axiosClient.put(url, {
      phone: userInfo.phone,
      country: userInfo.country,
      province: userInfo.province,
      district: userInfo.district,
      detail: userInfo.detail,
    });
  },

  findAll: (params) => {
    const url = "/user";
    return axiosClient.get(url, {
      params: params,
    });
  },

  addRoleAdmin: (userId) => {
    const url = "/user/addAdminRole";
    return axiosClient.post(url, userId);
  },
};

export default UserApi;
