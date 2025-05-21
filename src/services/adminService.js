import axios from 'axios';

const API_URL = "http://localhost:8081";

export const getUsersWithRestaurants = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true
  });
};
