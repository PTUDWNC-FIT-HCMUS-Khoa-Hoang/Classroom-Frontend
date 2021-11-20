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

export const createInvitationService = (data, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "/invitation/classroom",
      headers: { Authorization: `Bearer ${token}` },
      data: data,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
