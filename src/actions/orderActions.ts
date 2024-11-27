import apiClient from "../apiClient/apiClient";

export const createOrder = async (data: any) => {
  try {
    const response = await apiClient.post(`/api/order/create`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const editOrder = async (id: string, data: any) => {
  try {
    const response = await apiClient.put(`/api/order/edit/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await apiClient.delete(`/api/order/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getOrders = async (page: number = 1, limit: number = 15, search: string = "", user: boolean = false) => {
  try {
    const response = await apiClient.get(`/api/order/list`, {
      params: { page, limit, search, user },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getTotalOrderValue = async () => {
  try {
    const response = await apiClient.get(`/api/order/total-order-value`);
    return response;
  } catch (error) {
    return error;
  }
};
