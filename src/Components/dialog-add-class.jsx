import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { createAClassroom } from "../redux/classroom/classroom.actions";
import { selectUser, selectToken } from "../redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tên môn học"),
});

const DialogAddClass = ({
  handleCloseDialog,
  isOpenDialog,
  createAClassroom,
}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      createAClassroom(values.title);
      resetForm();
      handleCloseDialog();
    },
  });

  const customHanldeCloseDialog = () => {
    handleCloseDialog();
    formik.handleReset();
  };

  return (
    <Dialog open={isOpenDialog} onClose={customHanldeCloseDialog} fullWidth>
      <DialogTitle>Tạo lớp học</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Tên lớp học"
            type="text"
            fullWidth
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={customHanldeCloseDialog}>Huỷ</Button>
          <Button
            disabled={formik.values.title === "" ? true : false}
            type="submit"
          >
            Tạo
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

const mapDispatch = (dispatch) => ({
  createAClassroom: (user, title, token) =>
    dispatch(createAClassroom(user, title, token)),
});

export default connect(mapState, mapDispatch)(DialogAddClass);
