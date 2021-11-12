import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../utils/tab-panel";
import Card from "@mui/material/Card";
import UserInfo from "./user-info";
import UserPassword from "./user-password";
import { selectUser, selectToken } from "../../redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  content: {
    flex: 5,
  },
});

const UserDetails = ({ user }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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

const mapState = createStructuredSelector({
  user: selectUser,
  token: selectToken,
});

export default connect(mapState)(UserDetails);
