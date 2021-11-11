import React, { useState } from "react";
import styled from "styled-components";
import DialogAddClass from "./dialog-add-class";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "@mui/material/Link";
import { createStructuredSelector } from "reselect";
import { selectIsOpenAClassroom } from "../redux/classroom/classroom.selector";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { userLogout } from "../redux/user/user.action";
import { connect } from "react-redux";

const PopupOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    minHeight: "70px",
    zIndex: 999,
  },
  header__title: {
    textAlign: "left",
    fontSize: "1.375rem",
    margin: "1rem 2rem",
    cursor: "pointer",
  },
  userOptions: {
    display: "flex",
    padding: "10px",
    minWidth: "300px",
  },
  userOptions__userDetail: {
    textDecoration: "none",
  },
});
const Header = ({
  user,
  userLogout,
  activeTab,
  handleChangeTab,
  isOpenAClassroom,
}) => {
  const classes = useStyles();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserOption = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    userLogout();
  };

  const stringAvatar = (name) => name.split("")[0];

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <Card className={classes.header}>
      <Link
        href="/classrooms"
        sx={{
          textAlign: "left",
          fontSize: "28px",
          margin: "1rem 2rem",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Classroom
      </Link>
      {isOpenAClassroom && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "5px 0px",
            paddingRight: "2rem",
            fontSize: "1rem",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            centered
          >
            <Tab
              sx={{ fontSize: "17px", fontWeight: "600" }}
              label="Bảng tin"
            />
            <Tab
              sx={{ fontSize: "17px", fontWeight: "600" }}
              label="Mọi người"
            />
          </Tabs>
        </Box>
      )}
      {user && (
        <div>
          {!isOpenAClassroom && (
            <IconButton
              sx={{
                marginRight: "1rem",
                fontSize: "35px",
                width: "60px",
              }}
              onClick={handleOpenDialog}
            >
              +
            </IconButton>
          )}
          <DialogAddClass
            handleCloseDialog={handleCloseDialog}
            isOpenDialog={isOpenDialog}
          />

          <IconButton
            aria-describedby={id}
            variant="outlined"
            onClick={handleClickAvatar}
          >
            <Avatar sx={{ cursor: "pointer", fontWeight: "bold" }}>
              {stringAvatar(user.fullname)}
            </Avatar>
          </IconButton>
          <Popover
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseUserOption}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <PopupOptionsWrapper className={classes.userOptions}>
              <Avatar
                sx={{
                  width: "80px",
                  height: "80px",
                  margin: "auto",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                {stringAvatar(user.fullname)}
              </Avatar>
              <Button href="/user" sx={{ mt: 1, mb: 1, fontWeight: "700" }}>
                Thông tin cá nhân
              </Button>
              <Button sx={{ fontWeight: "700" }} onClick={handleLogout}>
                Đăng xuất
              </Button>
            </PopupOptionsWrapper>
          </Popover>
        </div>
      )}
    </Card>
  );
};

const mapState = createStructuredSelector({
  isOpenAClassroom: selectIsOpenAClassroom,
});

const mapDispatch = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
});

export default connect(mapState, mapDispatch)(Header);
