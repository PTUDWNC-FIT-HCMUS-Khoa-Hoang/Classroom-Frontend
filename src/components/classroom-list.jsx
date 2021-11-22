import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ClassroomPreview from "./classroom-preview";
import WithSpinner from "./with-spinner";
import Typography from "@mui/material/Typography";
import { fetchClassrooms } from "../redux/classrooms/classrooms.actions";
import { createStructuredSelector } from "reselect";
import {
  selectClassrooms,
  selectError,
  selectIsFetchingClassrooms,
} from "../redux/classrooms/classrooms.selector";
import { connect } from "react-redux";
import { selectUser } from "../redux/user/user.selector";

const useStyles = makeStyles({
  classList: {
    display: "flex",
    height: "100%",
    marginLeft: "1rem",
  },
  classList__body: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  spinner: {
    alignSelf: "center",
    width: "100%",
    margin: "auto",
  },
});

const ClassroomList = ({
  user,
  fetchClassrooms,
  error,
  classrooms,
  isFetching,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (classrooms === null) {
      fetchClassrooms();
    }
  }, [classrooms, fetchClassrooms, user]);

  if (classrooms === null) {
    return null;
  }

  const isEmpty = classrooms.length === 0;

  return (
    <div className={classes.classList}>
      {error ? (
        <p>Đang có lỗi</p>
      ) : isEmpty && !isFetching ? (
        <Typography sx={{ marginTop: "10rem", width: "100%" }} variant="h5">
          Bạn chưa tham gia lớp nào
        </Typography>
      ) : (
        <List className={classes.classList__body}>
          {classrooms.map((item) => (
            <ListItem key={item._id} sx={{ width: "auto" }}>
              <ClassroomPreview {...item} user={user} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

const mapState = createStructuredSelector({
  classrooms: selectClassrooms,
  user: selectUser,
  error: selectError,
  isFetching: selectIsFetchingClassrooms,
});

const mapDispatch = (dispatch) => ({
  fetchClassrooms: () => dispatch(fetchClassrooms()),
});

export default connect(mapState, mapDispatch)(WithSpinner(ClassroomList));
