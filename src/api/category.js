import axiosClient from "./axiosClient";

const CategoryApi = {
  getAll: (params) => {
    const url = "/categories";
    return axiosClient.get(url, {
      params,
    });
  },

  getById: (categoryId) => {
    const url = "/categories" + categoryId;
    return axiosClient.get(url);
  },

  getByName: (categoryName) => {
    const url = "/categories";
    return axiosClient.get(url, {
      params: {
        query: categoryName,
      },
    });
  },
};

export default CategoryApi;
