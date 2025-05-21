// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8081/api/auth"; // change if backend is deployed

export const register = (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const login = (userData) =>
  axios.post(`${API_URL}/login`, userData);
