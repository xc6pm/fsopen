import axios from "axios";

const login = async (username, password) => {
  return axios.post("/api/login", { username, password });
};

export { login };
