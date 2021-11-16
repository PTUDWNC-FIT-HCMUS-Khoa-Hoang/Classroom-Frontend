import axios from "axios";

export const createAClassroomService = (title, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "/classrooms",
      headers: { Authorization: `Bearer ${token}` },
      data: { title },
    })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export const fetchAClassroomService = (token, id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/classrooms/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
