import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DialogInvite from "./dialog-invite";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    width: "60%",
  },
  participantWrapper: {
    textAlign: "left",
    marginTop: "20px",
    marginBottom: "40px",
  },
  participantWrapper__header: {
    display: "flex",
    justifyContent: "space-between",
  },
  participantWrapper__list: {
    marginTop: "20px",
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
  },
  pariticipantInfo: {
    display: "flex",
    flexDirection: "row",
    margin: "5px 0",
  },
});

const Participants = ({
  user,
  participants,
  owner,
  invitationCode,
  classroomId,
}) => {
  const [isOpenInviteTeacher, setIsOpenInviteTeacher] = useState(false);
  const [isOpenInviteStudent, setIsOpenInviteStudent] = useState(false);

  const classes = useStyles();

  const handleInviteStudent = () => {
    setIsOpenInviteStudent(true);
  };

  const handleCloseDialogInviteStudent = () => {
    setIsOpenInviteStudent(false);
  };

  const handleInviteTeacher = () => {
    setIsOpenInviteTeacher(true);
  };

  const handleCloseDialogInviteTeacher = () => {
    setIsOpenInviteTeacher(false);
  };

  const teacherList = participants.filter(
    (member) => member.role === "teacher"
  );

  let isTeacher = user._id === owner?._id;
  teacherList.forEach((teacher) => {
    if (teacher._id === user._id) {
      isTeacher = true;
    }
  });

  const studentList = participants.filter(
    (member) => member.role === "student" && member._id !== user._id
  );

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.participantWrapper}>
          <div className={classes.participantWrapper__header}>
            <Typography
              variant="h4"
              sx={{ pl: 2, m: 1, color: "cornflowerblue" }}
            >
              Giáo viên
            </Typography>
            {isTeacher && (
              <Button onClick={handleInviteTeacher}>
                <PersonAddIcon sx={{ color: "cornflowerblue" }} />
              </Button>
            )}
          </div>
          <DialogInvite
            isOpenDialog={isOpenInviteTeacher}
            handleCloseDialog={handleCloseDialogInviteTeacher}
            dialogTitle="Mời giáo viên"
          />
          <Divider
            sx={{ borderBottomWidth: "unset", borderColor: "cornflowerblue" }}
          />
          <div className={classes.participantWrapper__list}>
            <div className={classes.pariticipantInfo}>
              <AccountCircleIcon
                sx={{ mr: 2, fill: "cornflowerblue" }}
                fontSize="large"
              />
              <Typography sx={{ fontSize: "18px", alignSelf: "center" }}>
                {owner.fullname}
              </Typography>
            </div>
            {teacherList.map((teacher) => (
              <div key={teacher._id} className={classes.pariticipantInfo}>
                <AccountCircleIcon
                  sx={{ mr: 2, fill: "cornflowerblue" }}
                  fontSize="large"
                />
                <Typography sx={{ fontSize: "18px", alignSelf: "center" }}>
                  {teacher.fullname}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.participantWrapper}>
          <div className={classes.participantWrapper__header}>
            <Typography
              variant="h4"
              sx={{ pl: 2, m: 1, color: "cornflowerblue" }}
            >
              {isTeacher ? "Sinh viên" : "Bạn học"}
            </Typography>
            {isTeacher && (
              <Button onClick={handleInviteStudent}>
                <PersonAddIcon sx={{ color: "cornflowerblue" }} />
              </Button>
            )}
          </div>
          <DialogInvite
            isOpenDialog={isOpenInviteStudent}
            handleCloseDialog={handleCloseDialogInviteStudent}
            invitationCode={invitationCode}
            classroomId={classroomId}
            dialogTitle="Mời học viên"
          />
          <Divider
            sx={{ borderBottomWidth: "unset", borderColor: "cornflowerblue" }}
          />
          <div className={classes.participantWrapper__list}>
            {studentList.map((student) => (
              <div key={student._id} className={classes.pariticipantInfo}>
                <AccountCircleIcon
                  sx={{ mr: 2, fill: "cornflowerblue" }}
                  fontSize="large"
                />
                <Typography sx={{ fontSize: "18px", alignSelf: "center" }}>
                  {student.fullname}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
