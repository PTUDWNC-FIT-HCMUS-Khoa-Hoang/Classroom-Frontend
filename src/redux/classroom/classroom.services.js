import axios from "axios";

export const fetchClassroomsService = (user, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "/classrooms/owned",
      data: user,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const createAClassroomService = (user, title, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "/classrooms",
      headers: { Authorization: `Bearer ${token}` },
      data: { title, user },
    })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};
