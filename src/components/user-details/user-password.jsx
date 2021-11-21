import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { updateProfile } from "../../redux/user/user.action";
import { selectUpdatingError } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserPassword = ({ updateProfile, updatingError }) => {
  const schema = Yup.object().shape({
    oldPassword: Yup.string().required("Vui lòng nhập"),
    newPassword: Yup.string().required("Vui lòng nhập"),
    newPasswordConfirm: Yup.string().required("Vui lòng nhập"),
  });

  const [error, setError] = useState(null);
  const [helptext, setHelptext] = useState(null);

  useEffect(() => {
    if (updatingError) {
      setError(updatingError);
      setHelptext("Mật khẩu cũ không chính xác");
    }
  }, [updatingError]);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      setError(null);
      setHelptext("Cập nhật thành công");
      updateProfile({
        currentPassword: values.oldPassword,
        password: values.newPassword,
      });
      resetForm();
    },
  });

  const onChange = (e) => {
    setError(null);
    setHelptext(null);
    formik.handleChange(e);
  };

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
              onChange={onChange}
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
            <FormHelperText sx={{ color: "green" }} error={error}>
              {helptext}
            </FormHelperText>
          </CardContent>
          <CardActions sx={{ justifyContent: "right" }}>
            <Button type="submit">Lưu</Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

const mapState = createStructuredSelector({
  updatingError: selectUpdatingError,
});

const mapDispatch = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfile(data)),
});

export default connect(mapState, mapDispatch)(UserPassword);
