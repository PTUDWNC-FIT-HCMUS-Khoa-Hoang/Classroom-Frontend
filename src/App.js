import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ClassList from "./Components/ClassList";
import Header from "./Components/Header";
import useToken from "./Components/UseToken";
import LoginPage from "./Components/LoginPage";
import PrivateRoute from "./Utils/PrivateRoute";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
});

const App = () => {
  const classes = useStyles();

  const { token, setToken } = useToken();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const saveUser = (user) => {
    setUser(user);
    sessionStorage.setItem("user", user);
  };

  const removeUser = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const removeToken = () => {
    setToken(null);
  };

  const logout = () => {
    removeUser();
    removeToken();
  };

  useEffect(() => {
    document.title = "Classroom";
  }, []);

  return (
    <div className={classes.root}>
      <Header user={user} removeToken={removeToken} logout={logout} />
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={() =>
              !user ? (
                <LoginPage setUser={saveUser} setToken={setToken} />
              ) : (
                <Redirect to="/classrooms" />
              )
            }
          />
          <PrivateRoute
            path="/classrooms"
            component={ClassList}
            authed={user}
            token={token}
            user={user}
          />
          <Route path="/" render={() => <Redirect to="/classrooms" />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
