import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import WithSpinner from "../with-spinner";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { userRegister } from "../../redux/user/user.action";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  registerForm: {
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

const registerSchema = Yup.object().shape({
  fullname: Yup.string().required("Vui lòng nhập họ tên"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  passwordConfirm: Yup.string().required("Vui lòng nhập xác nhận mật khẩu"),
});

const RegisterPage = () => {
  const classes = useStyles();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [isChange, setIsChange] = useState(false);
  const error = useSelector(({ user }) => user.error);
  const isInvalidEmail = useSelector(({ user }) => user.isInvalidEmail);
  const dispatch = useDispatch();
  const dispatchUserRegister = (email, password, fullname) =>
    dispatch(userRegister(email, password, fullname));

  useEffect(() => {
    setIsChange(false);
  }, [isInvalidEmail]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: registerSchema,
  });

  const handleChange = (e) => {
    formik.handleChange(e);
    setIsChange(true);
  };

  const checkPasswordConfirm = () => {
    return formik.values.password === formik.values.passwordConfirm;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let canSubmit = true;
    if (formik.values.fullname === "") {
      fullnameRef.current.classList.add(classes.shake);
      canSubmit = false;
    }
    if (formik.values.email === "" || Boolean(formik.errors.email)) {
      emailRef.current.classList.add(classes.shake);
      canSubmit = false;
    }
    if (formik.values.password === "") {
      passwordRef.current.classList.add(classes.shake);
      canSubmit = false;
    }
    if (formik.values.passwordConfirm === "") {
      passwordConfirmRef.current.classList.add(classes.shake);
      canSubmit = false;
    }

    if (isInvalidEmail && !isChange) {
      emailRef.current.classList.add(classes.shake);
      canSubmit = false;
    }
    if (!checkPasswordConfirm()) {
      passwordConfirmRef.current.classList.add(classes.shake);
      canSubmit = false;
    }

    formik.handleSubmit();

    if (
      !canSubmit ||
      Boolean(formik.errors.fullname) ||
      Boolean(formik.errors.email) ||
      Boolean(formik.errors.password) ||
      Boolean(formik.errors.passwordConfirm)
    ) {
      return;
    }

    dispatchUserRegister(
      formik.values.email,
      formik.values.password,
      formik.values.fullname
    );
  };

  return (
    <Card
      className={classes.formWrapper}
      sx={{ boxShadow: 2 }}
      variant="outlined"
    >
      <CardContent className={classes.formContent}>
        <Typography variant="h4">Đăng ký tài khoản</Typography>
        <form className={classes.registerForm} onSubmit={handleSubmit}>
          <TextField
            ref={fullnameRef}
            id="fullname"
            label="Họ và tên"
            variant="outlined"
            name="fullname"
            sx={{ mt: 2 }}
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
            onAnimationEnd={(e) => e.target.classList.remove(classes.shake)}
          />

          <TextField
            ref={emailRef}
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            sx={{ mt: 1 }}
            value={formik.values.userName}
            onChange={isInvalidEmail ? handleChange : formik.handleChange}
            error={
              (formik.touched.email && Boolean(formik.errors.email)) ||
              (formik.touched.email && isInvalidEmail && !isChange)
            }
            helperText={
              (formik.touched.email && formik.errors.email) ||
              (isInvalidEmail &&
                !isChange &&
                formik.touched.email &&
                "Email này đã có người sử dụng")
            }
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
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onAnimationEnd={(e) => e.target.classList.remove(classes.shake)}
          />
          <TextField
            ref={passwordConfirmRef}
            id="passwordConfirm"
            type="password"
            label="Xác nhận mật khẩu"
            variant="outlined"
            name="passwordConfirm"
            sx={{ mt: 1 }}
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            error={
              (formik.touched.passwordConfirm &&
                Boolean(formik.errors.passwordConfirm)) ||
              (!checkPasswordConfirm() && formik.touched.passwordConfirm)
            }
            helperText={
              (formik.touched.passwordConfirm &&
                formik.errors.passwordConfirm) ||
              (formik.touched.passwordConfirm &&
                !checkPasswordConfirm() &&
                "Mật khẩu xác nhận không đúng")
            }
            onAnimationEnd={(e) => e.target.classList.remove(classes.shake)}
          />
          {error && (
            <Typography
              variant="body2"
              display="block"
              sx={{ mt: 2 }}
              className={classes.wrongAccountMessage}
            >
              Server đang gặp chút trục trặc! Vui lòng quay lại sau
            </Typography>
          )}
          <Button
            sx={{ mt: 1, fontSize: "16px" }}
            variant="outlined"
            type="submit"
          >
            Đăng ký
          </Button>
          <Link href="/login" variant="body1" sx={{ mt: 2 }}>
            Đã có tài khoản? Nhấn vào đây để đăng nhập
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default WithSpinner(RegisterPage);
