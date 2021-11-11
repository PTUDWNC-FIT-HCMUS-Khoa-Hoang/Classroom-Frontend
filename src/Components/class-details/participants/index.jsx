import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { createStructuredSelector } from "reselect";
import { selectUser } from "../../../redux/user/user.selector";
import { connect } from "react-redux";
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
  teacherWrapper: {
    textAlign: "left",
    marginTop: "20px",
    marginBottom: "40px",
  },
  teacherWrapper__header: {
    display: "flex",
    justifyContent: "space-between",
  },
  teacherWrapper__list: {
    marginTop: "20px",
    marginLeft: "10px",
    display: "flex",
  },
  studentWrapper: {
    textAlign: "left",
    marginTop: "20px",
    marginBottom: "40px",
  },
  studentWrapper__header: {
    display: "flex",
    justifyContent: "space-between",
  },
  studentWrapper__list: {
    marginTop: "20px",
    marginLeft: "10px",
    display: "flex",
  },
});

const Participants = ({ user, classroom }) => {
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

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.teacherWrapper}>
          <div className={classes.teacherWrapper__header}>
            <Typography
              variant="h4"
              sx={{ pl: 2, m: 1, color: "cornflowerblue" }}
            >
              Giáo viên
            </Typography>
            {user._id === classroom?.owner && (
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
          <div className={classes.teacherWrapper__list}>
            <AccountCircleIcon
              sx={{ mr: 2, fill: "cornflowerblue" }}
              fontSize="large"
            />
            <Typography sx={{ fontSize: "18px", alignSelf: "center" }}>
              {classroom?.owner}
            </Typography>
          </div>
        </div>
        <div className={classes.studentWrapper}>
          <div className={classes.studentWrapper__header}>
            <Typography
              variant="h4"
              sx={{ pl: 2, m: 1, color: "cornflowerblue" }}
            >
              {user._id === classroom?.owner ? "Sinh viên" : "Bạn học"}
            </Typography>
            {user._id === classroom?.owner && (
              <Button onClick={handleInviteStudent}>
                <PersonAddIcon sx={{ color: "cornflowerblue" }} />
              </Button>
            )}
          </div>
          <DialogInvite
            isOpenDialog={isOpenInviteStudent}
            handleCloseDialog={handleCloseDialogInviteStudent}
            dialogTitle="Mời học viên"
          />
          <Divider
            sx={{ borderBottomWidth: "unset", borderColor: "cornflowerblue" }}
          />
          <div className={classes.studentWrapper__list}>
            <AccountCircleIcon
              sx={{ mr: 2, fill: "cornflowerblue" }}
              fontSize="large"
            />
            <Typography sx={{ fontSize: "18px", alignSelf: "center" }}>
              {classroom?.owner}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = createStructuredSelector({
  user: selectUser,
});

export default connect(mapState)(Participants);
