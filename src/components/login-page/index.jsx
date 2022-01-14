import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, googleLogin } from "../../redux/user/user.action";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import WithSpinner from "../with-spinner";
import GoogleLogin from "react-google-login";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles({
  loginForm: {
    display: "flex",
    flexDirection: "column",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "35%",
    margin: "auto",
    marginTop: "5rem",
    border: "12px",
    boxShadow: "1px",
  },
  formContent: {
    justifySelf: "center",
  },
  wrongAccountMessage: {
    color: "red",
  },
  messageField: {
    marginTop: "2px",
  },
  googleLoginButton: {
    marginTop: "8px",
    justifyContent: "center",
  },
  shake: {
    animation: "$shake 0.5s",
  },
  "@keyframes shake": {
    "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
    " 0%": { transform: "translate(1px, 1px) rotate(0deg) " },
    "20%": { transform: "translate(-3px, 0px) rotate(1deg) " },
    "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
    "40%": { transform: "translate(1px, -1px) rotate(1deg) " },
    "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
    "60%": { transform: "translate(-3px, 1px) rotate(0deg) " },
    "70%": { transform: "translate(3px, 1px) rotate(-1deg) " },
    "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
    "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
    "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
  },
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const Login = () => {
  const error = useSelector(({ user }) => user.error);
  const dispatch = useDispatch();
  const dispatchUserLogin = (email, password) =>
    dispatch(userLogin(email, password));
  const dispatchGoogleLogin = (tokenId) => dispatch(googleLogin(tokenId));
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatchUserLogin(values.email, values.password);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formik.values.email === "" || Boolean(formik.errors.email)) {
      emailRef.current.classList.add(classes.shake);
    }
    if (formik.values.password === "") {
      passwordRef.current.classList.add(classes.shake);
    }
    formik.handleSubmit(e);
  };
  const responseGoogle = (response) => {
    dispatchGoogleLogin(response.tokenId);
  };

  return (
    <Card
      className={classes.formWrapper}
      sx={{ boxShadow: 2 }}
      variant="outlined"
    >
      <CardContent className={classes.formContent}>
        <Typography variant="h4">Chào mừng đến với </Typography>
        <Typography variant="h2">Classroom</Typography>
        <Typography variant="subtitle1">
          Đăng nhập để sử dụng ứng dụng
        </Typography>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <TextField
            ref={emailRef}
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            sx={{ mt: 2 }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onAnimationEnd={(e) => e.target.classList.remove(classes.shake)}
          />

          <TextField
            ref={passwordRef}
            id="password"
            type="password"
            label="Mật khẩu"
            variant="outlined"
            name="password"
            sx={{ mt: 1 }}
            value={"" || formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onAnimationEnd={(e) => e.target.classList.remove(classes.shake)}
          />
          {error && (
            <Typography
              variant="body2"
              display="block"
              sx={{ mt: 2 }}
              className={classes.wrongAccountMessage}
            >
              {error}
            </Typography>
          )}
          <Button sx={{ mt: 1 }} variant="outlined" type="submit">
            Đăng nhập
          </Button>
          <GoogleLogin
            clientId="946914292240-hcpfcel2293a7vlasv66nt4jdv18j3dk.apps.googleusercontent.com"
            buttonText="Đăng nhập bằng Google"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className={classes.googleLoginButton}
          />
          <Link href="/register" variant="body2" sx={{ mt: 2 }}>
            Bạn chưa có tài khoản? Nhấn vào đây để đăng ký
          </Link>
          <Divider sx={{ mt: 2 }} />
          <Link href="#" variant="body2" sx={{ mt: 2 }}>
            Bạn quên mật khẩu?
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default WithSpinner(Login);
