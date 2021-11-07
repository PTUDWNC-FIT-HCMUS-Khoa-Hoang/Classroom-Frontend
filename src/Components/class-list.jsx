import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MyClass from "./my-class";
import { fetchClassrooms } from "../redux/classroom/classroom.actions";
import { createStructuredSelector } from "reselect";
import {
  selectClassroom,
  selectIsFetching,
  selectError,
} from "../redux/classroom/classroom.selector";
import { connect } from "react-redux";
import { selectUser, selectToken } from "../redux/user/user.selector";
import WithSpinner from "./with-spinner";

const useStyles = makeStyles({
  classList: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "1rem",
  },
  classList__body: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
  },
  spinner: {
    alignSelf: "center",
    width: "100%",
    margin: "auto",
  },
});

const ClassList = ({ token, user, fetchClassrooms, error, classrooms }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchClassrooms(user, token);
  }, []);

  return (
    <div className={classes.classList}>
      {error ? (
        <p>Some error</p>
      ) : (
        <List className={classes.classList__body}>
          {classrooms?.map((item) => (
            <ListItem key={item._id} sx={{ width: "auto" }}>
              <MyClass {...item} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

const mapState = createStructuredSelector({
  classrooms: selectClassroom,
  user: selectUser,
  token: selectToken,
  isFetching: selectIsFetching,
  error: selectError,
});

const mapDispatch = (dispatch) => ({
  fetchClassrooms: (user, token) => dispatch(fetchClassrooms(user, token)),
});

export default connect(mapState, mapDispatch)(WithSpinner(ClassList));
