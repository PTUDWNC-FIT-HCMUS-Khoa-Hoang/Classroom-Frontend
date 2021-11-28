import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { createAClassroom } from "../../redux/classroom/classroom.actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập tên môn học"),
});

const DialogAddClass = ({ handleCloseDialog, isOpenDialog }) => {
  const dispatch = useDispatch();
  const dispatchCreateAClassroom = (title) => dispatch(createAClassroom(title));
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      dispatchCreateAClassroom(values.title);
      resetForm();
      handleCloseDialog();
    },
  });

  const customHandleCloseDialog = () => {
    handleCloseDialog();
    formik.handleReset();
  };

  return (
    <Dialog open={isOpenDialog} onClose={customHandleCloseDialog} fullWidth>
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
          <Button onClick={customHandleCloseDialog}>Huỷ</Button>
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

export default DialogAddClass;
