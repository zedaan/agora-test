import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://agora-test-task.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const get = async (url: string, params?: any) => {
  const response = await axiosInstance.get(url, { params });
  return response?.data;
};

export const post = async (url: string, data?: any) => {
  const response = await axiosInstance.post(url, data);
  return response?.data;
};

export const put = async (url: string, data?: any) => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

export const del = async (url: string, data?: any) => {
  const response = await axiosInstance.delete(url, data);
  return response?.data;
};
