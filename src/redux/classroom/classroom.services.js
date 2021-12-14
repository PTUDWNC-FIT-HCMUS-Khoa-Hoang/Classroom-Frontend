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

export const checkIfJoinedClassroom = (classroomId, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/join-classroom/check/${classroomId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const acceptJoinClassroom = (invitationId, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/invitation/classroom/accept/${invitationId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const updateClassroomService = (data, classroomId, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `/classrooms/${classroomId}`,
      headers: { Authorization: `Bearer ${token}` },
      data,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const downloadStudentListService = (classroomId, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/classrooms/student-list/csv/${classroomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/csv",
      },
    })
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
export const uploadStudentListService = (classroomId, token, formData) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `/classrooms/student-list/csv/${classroomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

// Grade detail

export const updateAGrade = (
  classroomId,
  token,
  studentId,
  studentName,
  gradeId,
  grade
) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `/classrooms/student-list/csv/${classroomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: { classroomId, studentId, studentName, gradeId, grade },
    })
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

// export const getDataByGrade =
