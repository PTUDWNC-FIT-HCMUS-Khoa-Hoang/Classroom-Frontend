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
      .then((response) => resolve(response.data))
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

export const updateAGradeForAStudentService = (
  classroomId,
  token,
  studentId,
  gradeId,
  grade
) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "/grade-detail",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { classroomId, studentId, gradeId, grade },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const downloadAGradeColumnService = (classroomId, token, gradeId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/grade-detail/csv/${classroomId}/${gradeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/csv",
      },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const uploadGradeForAnAssignmentService = (
  classroomId,
  gradeId,
  token,
  formData
) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `/grade-detail/csv/${classroomId}/${gradeId}`,
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

export const downloadGradeBoardByClassroomService = (classroomId, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/grade-detail/csv/${classroomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/csv",
      },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const getGradesByClassroomService = (classroomId, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/grade-detail/${classroomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export const fetchGradeReviewByClassroomService = (classroomId, token) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `/grade-reviews/by-classroom-id/${classroomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
