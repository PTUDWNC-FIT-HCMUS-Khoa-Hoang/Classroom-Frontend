import React, { useState } from "react";
import styled from "styled-components";
import DialogAddClass from "./dialog-add-class";
import DialogJoinClass from "./dialog-join-class";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useHistory, useLocation } from "react-router-dom";
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
    minWidth: "250px",
  },
  userOptions__userDetail: {
    textDecoration: "none",
  },
  addOptions: {
    display: "flex",
    minWidth: "100px",
  },
});
const Header = ({ user, userLogout, activeTab, handleChangeTab }) => {
  const classes = useStyles();

  const [isOpenCreateClassDialog, setIsOpenCreateClassDialog] = useState(false);
  const [isOpenJoinClassDialog, setIsOpenJoinClassDialog] = useState(false);
  const [anchorElUserOptions, setAnchorElUserOptions] = useState(null);
  const [anchorElAddOptions, setAnchorElAddOptions] = useState(null);

  const handleCloseCreateClassDialog = () => {
    setIsOpenCreateClassDialog(false);
  };

  const handleOpenCreateClassDialog = () => {
    handleCloseAddOptions();
    setIsOpenCreateClassDialog(true);
  };

  const handleCloseJoinClassDialog = () => {
    setIsOpenJoinClassDialog(false);
  };

  const handleOpenJoinClassDialog = () => {
    handleCloseAddOptions();
    setIsOpenJoinClassDialog(true);
  };

  const handleClickAvatar = (event) => {
    setAnchorElUserOptions(event.currentTarget);
  };

  const handleCloseUserOptions = () => {
    setAnchorElUserOptions(null);
  };

  const handleClickAdd = (event) => {
    setAnchorElAddOptions(event.currentTarget);
  };

  const handleCloseAddOptions = () => {
    setAnchorElAddOptions(null);
  };

  const handleLogout = () => {
    setAnchorElUserOptions(null);
    userLogout();
  };

  const stringAvatar = (name) => name.split("")[0];

  const openUserOptions = Boolean(anchorElUserOptions);
  const idUserOptions = openUserOptions ? "user-popover" : undefined;

  const openAddOptions = Boolean(anchorElAddOptions);
  const idAddOptions = openAddOptions ? "user-popover" : undefined;

  const history = useHistory();
  const location = useLocation();

  const isOnHomePage = location.pathname === "/classrooms";
  const isOpenAClassroom = location.pathname.includes("/classrooms/");

  return (
    <Card className={classes.header}>
      <Link
        to="/classrooms"
        style={{
          textAlign: "left",
          fontSize: "28px",
          margin: "1rem 2rem",
          textDecoration: "none",
          fontWeight: "bold",
          color: "cornflowerblue",
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
            paddingRight: "7rem",
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
          {isOnHomePage && (
            <IconButton
              sx={{
                marginRight: "1rem",
                fontSize: "35px",
                width: "60px",
              }}
              onClick={handleClickAdd}
            >
              +
            </IconButton>
          )}

          <Popover
            id={idAddOptions}
            anchorEl={anchorElAddOptions}
            open={openAddOptions}
            onClose={handleCloseAddOptions}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <PopupOptionsWrapper className={classes.addOptions}>
              <Button sx={{ m: 1 }} onClick={handleOpenJoinClassDialog}>
                Tham gia lớp học
              </Button>
              <Button sx={{ mb: 1 }} onClick={handleOpenCreateClassDialog}>
                Tạo lớp học
              </Button>
            </PopupOptionsWrapper>
          </Popover>

          <DialogJoinClass
            handleCloseDialog={handleCloseJoinClassDialog}
            isOpenDialog={isOpenJoinClassDialog}
          />

          <DialogAddClass
            handleCloseDialog={handleCloseCreateClassDialog}
            isOpenDialog={isOpenCreateClassDialog}
          />

          <IconButton
            aria-describedby={idUserOptions}
            variant="outlined"
            onClick={handleClickAvatar}
          >
            <Avatar sx={{ cursor: "pointer", fontWeight: "bold" }}>
              {stringAvatar(user.fullname)}
            </Avatar>
          </IconButton>
          <Popover
            id={idUserOptions}
            anchorEl={anchorElUserOptions}
            open={openUserOptions}
            onClose={handleCloseUserOptions}
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
              <Button
                onClick={() => {
                  handleCloseUserOptions();
                  history.push("/user");
                }}
                sx={{ mt: 1, mb: 1, fontWeight: "700" }}
              >
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

const mapDispatch = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
});

export default connect(null, mapDispatch)(Header);
