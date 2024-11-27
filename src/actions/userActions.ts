

import apiClient from "../apiClient/apiClient";

export const signUpUser = async (data: any) => {
  try {
    const response = await apiClient.post(`/api/auth/register`, data);

    return response;
  } catch (error) {
    return error
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await apiClient.post(`/api/auth/login`, data);

    return response;
  } catch (error) {
    return error
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiClient.get(`/api/auth/logout`);

    return response;
  } catch (error) {
    return error
  }
};

export const verifyUser = async (email:string, otp: string) => {
  try {
    const response = await apiClient.post(`/api/auth/verify`, {email, otp});

    return response;
  } catch (error) {
    return error
  }
};

export const googleLogin = async (data: {access_token: string}) => {
  try {
    console.log("inside login", data)
    const response = await apiClient.post(`/api/auth/google`, data);

    return response;
  } catch (error) {
    return error
  }
};


export const getUser = async () => {
  try {
    const res = await apiClient.get(`/api/auth/user`);

    return res;
  } catch (error: unknown) {
    return error
  }
};



