import axios from "axios";

const userLoginService = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/users/login", { email, password })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export default userLoginService;
