import axiosClient from "./axiosClient";

const ProductApi = {
  getAll: (params) => {
    const url = "/products";
    return axiosClient.get(url, {
      params: params,
    });
  },

  getById: (productId) => {
    const url = "/products/" + productId;
    return axiosClient.get(url);
  },

  getCategory: () => {
    const url = "products/category";
    return axiosClient.get(url);
  },

  getBrand: () => {
    const url = "products/brand";
    return axiosClient.get(url);
  },

  createProduct: (dataForm) => {
    const url = "/products";
    return axiosClient.post(url, dataForm);
  },

  updateProduct: (productId, dataForm) => {
    const url = `/products/${productId}`;
    return axiosClient.put(url, dataForm);
  },

  createProductReview: (productId, comment, rating) => {
    const url = `/products/${productId}/reviews`;
    return axiosClient.post(url, {
      productId: productId,
      comment: comment,
      rating: rating,
    });
  },

  getProductReview: (productId, page) => {
    const url = `products/${productId}/reviews`;
    return axiosClient.get(url, {
      params: {
        page: page,
      },
    });
  },

  checkProductIsReviewed: (productId) => {
    const url = `products/${productId}/reviewed`;
    return axiosClient.get(url);
  },

  deleteProduct: (productId) => {
    const url = `products/${productId}`;
    return axiosClient.delete(url);
  },
};

export default ProductApi;
