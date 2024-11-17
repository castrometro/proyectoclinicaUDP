import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUsers = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}${id}/`, getAuthHeaders());
};

export const updateUser = async (id, userData) => {
  await axios.put(`${API_URL}${id}/`, userData, getAuthHeaders());
};
