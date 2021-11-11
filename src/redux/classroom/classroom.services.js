import axios from "axios";

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
