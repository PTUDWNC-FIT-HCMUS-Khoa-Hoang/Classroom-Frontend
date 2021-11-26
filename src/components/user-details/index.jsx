import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../utils/tab-panel";
import Card from "@mui/material/Card";
import UserInfo from "./user-info";
import UserPassword from "./user-password";
import WithSpinner from "../with-spinner";
import { clearError } from "../../redux/user/user.action";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  content: {
    flex: 5,
  },
});

const UserDetails = () => {
  const classes = useStyles();
  const user = useSelector(({ user }) => user.user);
  const dispatch = useDispatch();
  const dispatchClearError = () => dispatch(clearError());
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatchClearError();
  };

  return (
    <Card
      sx={{ boxShadow: 2, m: 3, display: "flex", minHeight: "80vh" }}
      variant="outlined"
    >
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        centered
        sx={{ my: 5, flex: 1, borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Thông tin cá nhân" />
        <Tab label="Mật khẩu" />
      </Tabs>
      <div className={classes.content}>
        <TabPanel value={value} index={0}>
          <UserInfo user={user} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserPassword />
        </TabPanel>
      </div>
    </Card>
  );
};

export default WithSpinner(UserDetails);
