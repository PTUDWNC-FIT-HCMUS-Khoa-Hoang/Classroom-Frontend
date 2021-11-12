import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { selectUser, selectToken } from "../redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  code: Yup.string(),
});

const DialogJoinClass = ({ handleCloseDialog, isOpenDialog, user, token }) => {
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleCloseDialog();
    },
  });

  const customHanldeCloseDialog = () => {
    handleCloseDialog();
    formik.handleReset();
  };

  return (
    <Dialog open={isOpenDialog} onClose={customHanldeCloseDialog} fullWidth>
      <DialogTitle>
        Tham gia lớp học
        <Typography variant="subtitle1">
          Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào đây.
        </Typography>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label="Mã lớp học"
            type="text"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.code}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={customHanldeCloseDialog}>Huỷ</Button>
          <Button
            disabled={formik.values.code === "" ? true : false}
            type="submit"
          >
            Tham gia
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const mapState = createStructuredSelector({
  user: selectUser,
  token: selectToken,
});

export default connect(mapState)(DialogJoinClass);
