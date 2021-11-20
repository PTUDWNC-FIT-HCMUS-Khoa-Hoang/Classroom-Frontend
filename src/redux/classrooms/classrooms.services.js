import axios from "axios";

export const fetchClassroomsService = async (token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "/classrooms",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const joinByInvitationCodeService = (code, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/join-classroom/code/${code}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
