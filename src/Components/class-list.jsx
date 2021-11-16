import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ClassPreview from "./class-preview";
import WithSpinner from "./with-spinner";
import { fetchClassrooms } from "../redux/classrooms/classrooms.actions";
import { createStructuredSelector } from "reselect";
import {
  selectClassrooms,
  selectError,
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

const ClassList = ({ user, fetchClassrooms, error, classrooms }) => {
  const classes = useStyles();

  useEffect(() => {
    if (classrooms === null) {
      fetchClassrooms();
    }
  }, [classrooms, fetchClassrooms, user]);
  return (
    <div className={classes.classList}>
      {error ? (
        <p>Some error</p>
      ) : (
        <List className={classes.classList__body}>
          {classrooms?.map((item) => (
            <ListItem key={item._id} sx={{ width: "auto" }}>
              <ClassPreview {...item} user={user} />
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
});

const mapDispatch = (dispatch) => ({
  fetchClassrooms: () => dispatch(fetchClassrooms()),
});

export default connect(mapState, mapDispatch)(WithSpinner(ClassList));
