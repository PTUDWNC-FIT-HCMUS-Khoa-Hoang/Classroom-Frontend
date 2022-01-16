import React, { useEffect } from "react";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import WithSpinner from "../with-spinner";
import { fetchNotification } from "../../redux/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  notificationPopup: {
    width: "500px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0 5px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
  },
  notification: {
    height: "50px",
    backgroundColor: "white",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  },
});

const Notification = ({ anchorEl, handleClose }) => {
  const notifications = useSelector(({ user }) => user.notifications);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const dispatchFetchNotification = () => dispatch(fetchNotification());

  // fetch every minute when component did mouth
  useEffect(() => {
    const intervalId = setInterval(() => {
      // dispatchFetchNotification()
    }, 1000 * 60);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // re-fetch when ever open the notification
  useEffect(() => {
    // dispatchFetchNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className={classes.notificationPopup} sx={{ p: 2 }}>
        <div className={classes.header}>
          <Button
            variant="text"
            sx={{ mb: 1 }}
            onClick={() => {
              history.push("/grade-reviews");
              handleClose();
            }}
          >
            Tất cả thông báo
          </Button>
        </div>
        <Divider />
        <div className={classes.body}>
          {notifications.map((nt) => (
            <>
              <button className={classes.notification}>{nt}</button>
              <Divider />
            </>
          ))}
          <button
            className={classes.notification}
            onClick={() => {
              history.push("/grade-reviews/1");
              handleClose();
            }}
          >
            Thong bao 1 hoc sinh muon phuc khao diem
          </button>
          <Divider />
        </div>
      </div>
    </Popover>
  );
};

export default WithSpinner(Notification);
