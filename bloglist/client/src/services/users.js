import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const response = request;
  return response.data;
};

export default { getAll };
