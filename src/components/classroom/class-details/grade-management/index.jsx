import React from "react";
import TeacherGradeManagement from "./teacher";
import StudentGradeManagement from "./student";

const GradeManagement = ({ classroomId, token, owner, user, isTeacher }) => {
  if (isTeacher)
    return (
      <TeacherGradeManagement
        classroomId={classroomId}
        token={token}
        owner={owner}
        user={user}
      />
    );
  return (
    <StudentGradeManagement
      user={user}
      token={token}
      classroomId={classroomId}
    />
  );
};

export default GradeManagement;
