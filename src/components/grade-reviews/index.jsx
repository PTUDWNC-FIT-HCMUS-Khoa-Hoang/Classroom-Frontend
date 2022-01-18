import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { fetchNotifications } from "../../redux/user/user.action";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  gradeReviewList: {
    width: "60%",
  },
  listItem: {
    border: "1px solid lightgray",
    "&:hover": {
      borderColor: "#132f4c",
    },
  },
  isNotRead: {
    // eslint-disable-next-line no-undef
    backgroundColor: "#66b2ff",
    color: "whitesmoke",
  },
});

const GradeReviews = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchFetchNotifications = () => dispatch(fetchNotifications());
    dispatchFetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <h1>Danh sách các thông báo</h1>

      <List className={classes.gradeReviewList}>
        <ListItem
          disablePadding
          className={`${classes.listItem} ${classes.isNotRead}`}
        >
          <ListItemButton>
            <ListItemText sx={{ flex: 1 }} primary="Phúc khảo" />
            <ListItemText
              sx={{ flex: 3, textAlign: "center" }}
              primary="Học sinh ... lớp ... muốn phúc khảo điểm ..."
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding className={`${classes.listItem}`}>
          <ListItemButton
            component="button"
            onClick={() => {
              history.push("/grade-reviews/1");
            }}
          >
            <ListItemText primary="Spam" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default GradeReviews;
