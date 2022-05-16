import axiosClient from "./axiosClient";

const HeaderImageApi = {
  getAll: () => {
    const url = "/header-images";
    return axiosClient.get(url);
  },
  getWithFilter: (params) => {
    const url = "/header-images";
    return axiosClient.get(url, {
      params: params,
    });
  },
  addHeaderImage: (data) => {
    const url = "/header-images";
    return axiosClient.post(url, data);
  },
  updateHeaderImage: (id, data) => {
    const url = "/header-images/" + id;
    return axiosClient.put(url, data);
  },
  delete: (id) => {
    const url = "/header-images/" + id;
    return axiosClient.delete(url);
  },
};

export default HeaderImageApi;
