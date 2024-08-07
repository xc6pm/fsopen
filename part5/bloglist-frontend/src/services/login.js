import axios from "axios";

const login = async (username, password) => {
  const response = await axios.post("/api/login", { username, password });
  console.log("response", response);
  return response.data;
};

export { login };
