import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import userLogin from "../redux/user/user.action";
import { createStructuredSelector } from "reselect";
import {
  selectIsWrongAccount,
  selectIsLoading,
} from "../redux/user/user.selector";
import WithSpinner from "./with-spinner";

const useStyles = makeStyles({
  loginForm: {
    display: "flex",
    flexDirection: "column",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "35%",
    alignSelf: "center",
    margin: "auto",
  },
  inputField: {
    marginTop: "1rem",
  },
  wrongAccountMessage: {
    color: "red",
  },
});

const Login = ({ isWrongAccount, userLogin }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      userLogin(values.email, values.password);
      values.password = "";
    },
  });

  return (
    <div className={classes.formWrapper}>
      <h1> Classrooms </h1>
      <h3 style={{ margin: 0 }}> Login by your account</h3>
      <form className={classes.loginForm} onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          required
          sx={{ mt: 2 }}
          value={formik.values.userName}
          onChange={formik.handleChange}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          required
          sx={{ mt: 1 }}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button sx={{ mt: 1 }} variant="outlined" type="submit">
          Login
        </Button>
        {isWrongAccount && (
          <p className={classes.wrongAccountMessage}>
            The user name or password that you've entered is incorrect!
          </p>
        )}
      </form>
    </div>
  );
};

const mapState = createStructuredSelector({
  isWrongAccount: selectIsWrongAccount,
  isLoading: selectIsLoading,
});

const mapDispatch = (dispatch) => ({
  userLogin: (email, password) => dispatch(userLogin(email, password)),
});

export default connect(mapState, mapDispatch)(WithSpinner(Login));
