import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { checkIfJoinedClassroom } from "../redux/classroom/classroom.services";
import { acceptJoinClassroom } from "../redux/classroom/classroom.services";
import { useLocation, useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectToken } from "../redux/user/user.selector";
import { connect } from "react-redux";
import { joinByInvitationCode } from "../redux/classrooms/classrooms.actions";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: "10rem",
  },
  formWrapper: {
    margin: "auto",
  },
  formContent: {
    textAlign: "left",
  },
});

const JoinClassroom = ({ token, joinByInvitationCode }) => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  // const [isFetching, setIsFetching] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  const [classroomTitle, setClassroomTitle] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState(null);

  const classroomId = location.pathname.split("/join/")[1];
  const invitationId = location.search.split("?invitation=")[1];
  const invitationCode = location.search.split("?invitationCode=")[1];

  useEffect(() => {
    checkIfJoinedClassroom(classroomId, token)
      .then(() => {
        setIsChecking(false);
        history.push(`/classrooms/${classroomId}`);
      })
      .catch((error) => {
        //TODO: check invitationCode and classroomId
        if ("classroom" in error.response.data) {
          setClassroomTitle(error.response.data.classroom.title);
        } else {
          setError("Không tồn tại lớp học");
        }
        setIsChecking(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    setIsAccepting(true);
    if (invitationId) {
      acceptJoinClassroom(invitationId, token)
        .then(() => {
          setIsAccepting(false);
          history.push(`/classrooms/${classroomId}`);
        })
        .catch((error) => {
          setIsAccepting(false);
          setError(error);
        });
    } else {
      joinByInvitationCode(invitationCode);
    }
  };

  return (
    <div className={classes.wrapper}>
      {isAccepting || isChecking ? (
        <CircularProgress style={{ alignSelf: "center", margin: "auto" }} />
      ) : (
        <>
          {error ? (
            <h1>{error}</h1>
          ) : (
            <Card variant="outlined" className={classes.formWrapper}>
              <CardContent className={classes.formContent}>
                <Typography sx={{ marginBottom: 1 }} variant="h5">
                  Tham gia lớp học?
                </Typography>
                <Typography variant="body1">
                  Bạn được mời tham gia lớp học {classroomTitle}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button onClick={onClick} variant="contained">
                  THAM GIA
                </Button>
              </CardActions>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

const mapState = createStructuredSelector({
  token: selectToken,
});

const mapDispatch = (dispatch) => ({
  joinByInvitationCode: (code) => dispatch(joinByInvitationCode(code)),
});

export default connect(mapState, mapDispatch)(JoinClassroom);
