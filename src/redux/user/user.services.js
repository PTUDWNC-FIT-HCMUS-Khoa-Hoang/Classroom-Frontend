import axios from "axios";

export const userLoginService = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/users/login", { email, password })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const userRegisterService = (email, password, fullname) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/users/register", { email, password, fullname })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const fetchAUser = async (userId, token) => {
  return await axios.get(`/users/other/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
