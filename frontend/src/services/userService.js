import axios from "axios";

const API_URL = "http://localhost:5000";

export const getUsers = async () => {
  return await axios.get(`${API_URL}/api/users`);
};