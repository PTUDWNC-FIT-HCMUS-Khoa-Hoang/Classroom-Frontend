import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import { fetchNotifications } from "../../redux/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import { readNotificationService } from "../../redux/user/user.services";

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
    height: "400px",
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

const Notification = () => {
  const notifications = useSelector(({ user }) => user.notifications);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const dispatchFetchNotifications = () => dispatch(fetchNotifications());
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const token = useSelector(({ user }) => user.token);
  const isFetchingNotification = useSelector(
    ({ user }) => user.isFetchingNotification
  );
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
  }, [anchorElNotification]);
  const handleClickNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };
  return (
    <>
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

      <Popover
        open={Boolean(anchorElNotification)}
        anchorEl={anchorElNotification}
        onClose={handleCloseNotification}
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
            {!isFetchingNotification &&
              notifications?.reverse().map((nt) => (
                <button
                  className={`${classes.notification} ${
                    !nt.isRead ? classes.isNotRead : ""
                  }`}
                  onClick={() => {
                    if (nt.objectName === "grade-review")
                      history.push(`/grade-reviews/${nt.objectId}`);
                    else history.push(`/${nt.objectName}/${nt.objectId}`);
                    readNotificationService(token, nt._id);
                    handleCloseNotification();
                  }}
                >
                  {nt.message}
                </button>
              ))}
          </div>
        </div>
      </Popover>
    </>
  );
};

export default Notification;
