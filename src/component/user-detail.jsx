import React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { selectUser, selectToken } from "../redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserDetail = ({ user }) => {
  const schema = Yup.object().shape({
    fullname: Yup.string().required("Vui lòng nhập tên"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: user.fullname,
      id: "",
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
          width: "70%",
          mt: 5,
          boxShadow: 2,
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
              Thông tin cá nhân
            </Typography>
            <TextField
              sx={{ my: 1, mt: 3 }}
              label="Email"
              value={user.email}
              disabled
            />
            <TextField
              id="fullname"
              name="fullname"
              sx={{ my: 1 }}
              label="Họ tên"
              value={formik.values.fullname}
              onChange={formik.handleChange}
            />
            <TextField
              sx={{ mt: 1 }}
              id="id"
              name="id"
              label="Mã số sinh viên"
              onChange={formik.handleChange}
              value={formik.values.id}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "right" }}>
            <Button
              type="submit"
              disabled={
                formik.values.fullname === user.fullname &&
                formik.values.id === ""
              }
            >
              Lưu
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

const mapState = createStructuredSelector({
  user: selectUser,
  token: selectToken,
});

export default connect(mapState)(UserDetail);
