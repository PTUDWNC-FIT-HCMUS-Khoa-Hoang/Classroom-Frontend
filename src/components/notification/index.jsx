import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import WithSpinner from "../with-spinner";
import { fetchNotifications } from "../../redux/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";

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
    textAlign: "left",
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

const Notification = ({ anchorEl, handleClose }) => {
  const notifications = useSelector(({ user }) => user.notifications);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const dispatchFetchNotifications = () => dispatch(fetchNotifications());
  const [anchorElNotification, setAnchorElNotification] = useState(null);

  // const isFetchingNotification = useSelector(
  //   ({ user }) => user.isFetchingNotification
  // );
  // fetch every minute when component did mouth
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatchFetchNotifications();
    }, 1000 * 60);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-fetch when ever open the notification
  useEffect(() => {
    dispatchFetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);
  const handleClickNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };
  return (
    <div>
      <IconButton
        sx={{
          marginRight: "5px",
          fontSize: "35px",
          width: "60px",
        }}
        onClick={handleClickNotification}
      >
        <NotificationsIcon />
      </IconButton>
      <Notification
        anchorEl={anchorElNotification}
        handleClose={handleCloseNotification}
      />

      <Popover
        open={Boolean(anchorElNotification)}
        anchorEl={anchorElNotification}
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
          <div className={classes.body}>
            {notifications.map((nt) => (
              <button
                className={`${classes.notification} ${
                  !nt.isRead ? classes.isNotRead : ""
                }`}
                onClick={() => {
                  history.push(`/grade-reviews/${nt._id}`);
                  handleClose();
                }}
              >
                {nt.message}
              </button>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default WithSpinner(Notification);
