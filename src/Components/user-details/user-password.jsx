import React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserPassword = () => {
  const schema = Yup.object().shape({
    oldPassword: Yup.string().required("Vui lòng nhập"),
    newPassword: Yup.string().required("Vui lòng nhập"),
    newPasswordConfirm: Yup.string().required("Vui lòng nhập"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      return;
    },
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          boxShadow: 2,
          m: 3,
        }}
        variant="outlined"
      >
        <form onSubmit={formik.handleSubmit}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "left" }}>
              Mật khẩu
            </Typography>
            <TextField
              sx={{ my: 1, mt: 3 }}
              id="oldPassword"
              name="oldPassword"
              label="Mật khẩu cũ"
              type="password"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
              }
              helperText={
                formik.touched.oldPassword && formik.errors.oldPassword
              }
            />
            <TextField
              id="newPassword"
              name="newPassword"
              sx={{ my: 1 }}
              label="Mật khẩu mới"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
            <TextField
              sx={{ mt: 1 }}
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              label="Xác nhận mật khẩu mới"
              type="password"
              value={formik.values.newPasswordConfirm}
              onChange={formik.handleChange}
              error={
                (formik.touched.newPasswordConfirm &&
                  Boolean(formik.errors.newPasswordConfirm)) ||
                (formik.touched.newPasswordConfirm &&
                  formik.values.newPassword !==
                    formik.values.newPasswordConfirm)
              }
              helperText={
                (formik.touched.newPasswordConfirm &&
                  formik.errors.newPasswordConfirm) ||
                (formik.values.newPassword !==
                  formik.values.newPasswordConfirm &&
                  "Xác nhận mật khẩu không chính xác")
              }
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "right" }}>
            <Button type="submit">Lưu</Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default UserPassword;
