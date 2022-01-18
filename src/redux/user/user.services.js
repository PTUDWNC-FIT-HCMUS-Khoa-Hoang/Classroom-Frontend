import axios from "axios";

export const googleLoginService = (tokenId) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/users/login/google", { tokenId })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

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

export const updateProfileService = (data, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: "/users/me",
      headers: { Authorization: `Bearer ${token}` },
      data,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const fetchNotificationsService = (token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "/notifications/mine",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const readNotificationService = (token, id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `/notifications/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: { isRead: true },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const notifyGradeReviewService = (token, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "/grade-reviews",
      headers: { Authorization: `Bearer ${token}` },
      data,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const replyAGradeReviewByIDService = (token, id, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `/grade-reviews/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const fetchAGradeReviewService = (token, id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/grade-reviews/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
