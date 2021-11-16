import axios from "axios";

export const fetchClassroomsService = async (token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "/classrooms/owned",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
