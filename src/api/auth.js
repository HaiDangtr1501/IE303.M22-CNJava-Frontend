import axiosClient from "./axiosClient";

const AuthApi = {
  getCurrentUser: () => {
    return axiosClient.get("/user/me");
  },


  login: (email, password) => {
    return axiosClient.post("/auth/login", {
      email: email,
      password: password,
    });
  },

  signup: (name, email, password, confirmPassword) => {
    return axiosClient.post("/auth/signup", {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  },

  sendEmailResetPassword: (email) => {
    return axiosClient.post("/auth/reset-password", {
      email: email,
    });
  },

  postNewPassword: (token, password, passwordConfirm) => {
    return axiosClient.post(`/auth/reset-password/${token}`, {
      password: password,
      passwordConfirm: passwordConfirm,
    });
  },

  sendEmailVerification: (email) => {
    const url = "/auth/confirm-user-email";
    return axiosClient.post(url, email);
  },

  verifyEmail: (token) => {
    const url = "/auth/confirm-user-email/" + token;
    return axiosClient.get(url);
  },
};

export default AuthApi;
