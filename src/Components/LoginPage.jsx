import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import axios from "axios";

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
});

const Login = ({ setToken, setUser }) => {
  const [isWrongAccount, setIsWrongAccount] = useState(false);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post("/users/login", { ...values })
        .then(({ data }) => {
          console.log(data);
          setToken(data.token);
          setUser(data.user);
          sessionStorage.setItem("user", JSON.stringify(data.user));
        })
        .catch((err) => {
          const email = values.email;
          resetForm({ values: { email, password: "" } });
          setIsWrongAccount(true);
        });
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
          <p>The user name or password that you've entered is incorrect!</p>
        )}
      </form>
    </div>
  );
};

export default Login;
