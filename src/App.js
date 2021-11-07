import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import ClassList from "./components/class-list";
import Header from "./components/header";
import LoginPage from "./components/login-page";
import PrivateRoute from "./utils/private-route";
import { createStructuredSelector } from "reselect";
import { selectUser } from "./redux/user/user.selector";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
});

const App = ({ user, isLoading }) => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Classroom";
  }, []);

  return (
    <div className={classes.root}>
      <Header user={user} />
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={() =>
              !user ? (
                <LoginPage user={user} isLoading={isLoading} />
              ) : (
                <Redirect to="/classrooms" />
              )
            }
          />
          <PrivateRoute
            path="/classrooms"
            component={ClassList}
            authed={user}
          />
          <Route path="/" render={() => <Redirect to="/classrooms" />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const mapState = createStructuredSelector({
  user: selectUser,
});

export default connect(mapState)(App);
