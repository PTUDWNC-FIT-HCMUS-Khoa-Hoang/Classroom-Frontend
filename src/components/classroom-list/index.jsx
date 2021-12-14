import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ClassroomPreview from "../classroom-preview";
import WithSpinner from "../with-spinner";
import Typography from "@mui/material/Typography";
import { fetchClassrooms } from "../../redux/classrooms/classrooms.actions";
import { useSelector, useDispatch } from "react-redux";

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

const ClassroomList = () => {
  const classes = useStyles();
  const user = useSelector(({ user }) => user.user);
  const error = useSelector(({ classrooms }) => classrooms.error);
  const classrooms = useSelector(({ classrooms }) => classrooms.classrooms);
  const isFetching = useSelector(({ classrooms }) => classrooms.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchFetchClassrooms = () => dispatch(fetchClassrooms());
    dispatchFetchClassrooms();
  }, [dispatch]);

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

export default WithSpinner(ClassroomList);
