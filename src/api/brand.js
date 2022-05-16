import axiosClient from "./axiosClient";

const BrandApi = {
  getAll: () => {
    const url = "/brands";
    return axiosClient.get(url);
  },

  getById: (brandId) => {
    const url = "/brands/" + brandId;
    return axiosClient.get(url);
  },

  getByName: (brandName) => {
    const url = "/brands";
    return axiosClient.get(url, {
      params: {
        query: brandName,
      },
    });
  },
};
export default BrandApi;
