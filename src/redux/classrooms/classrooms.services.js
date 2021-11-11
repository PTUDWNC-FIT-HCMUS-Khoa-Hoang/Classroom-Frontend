import axios from "axios";
import { fetchAUser } from "../user/user.services";

export const fetchClassroomsService = async (user, token) => {
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

export const findOwnerFullname = (classrooms, token) => {
  return classrooms.map((item) => {
    return fetchAUser(item.owner, token).then((res) => {
      item["ownerFullname"] = res.data.fullname;
      return item;
    });
  });
};
