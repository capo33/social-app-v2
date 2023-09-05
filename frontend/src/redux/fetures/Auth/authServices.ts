import axios from "axios";

import { AUTH_URL } from "../../../constants/constants";
import { IAuthUser, IForgotPassword } from "../../../interfaces/AuthInterface";

// *************************** Auth *************************** //
// register
const register = async (formData: IAuthUser) => {
  const response = await axios.post(`${AUTH_URL}/register`, formData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// login
const login = async (formData: IAuthUser) => {
  const response = await axios.post(`${AUTH_URL}/login`, formData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// logout
const logout = () => {
  localStorage.removeItem("user");
};

// forgot password
const forgotPassword = async (formData: IForgotPassword) => {
  const response = await axios.post(`${AUTH_URL}/forgot-password`, formData);

  return response.data;
};


const authServices = {
  register,
  login,
  logout,
  forgotPassword,
};

export default authServices;
