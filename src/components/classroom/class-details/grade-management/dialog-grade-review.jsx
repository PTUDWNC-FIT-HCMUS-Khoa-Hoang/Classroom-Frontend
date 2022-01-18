import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { notifyGradeReview } from "../../../../redux/user/user.action";

export default function GradeReviewDialog({ open, handleClose, gradeId }) {
  const dispatch = useDispatch();
  const dispatchNotifyGradeReview = (
    gradeId,
    studentExpectation,
    studentExplanation
  ) =>
    dispatch(
      notifyGradeReview({
        gradeDetail: gradeId,
        studentExpectation,
        studentExplanation,
      })
    );
  const formik = useFormik({
    initialValues: {
      studentExpectation: "",
      studentExplanation: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatchNotifyGradeReview(
        gradeId,
        values.studentExpectation,
        values.studentExplanation
      );
      resetForm();
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Phúc khảo điểm</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Hãy nói rõ lý do bạn muốn phúc khảo với giáo viên
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Điểm mong muốn"
            type="number"
            fullWidth
            variant="standard"
            name="studentExpectation"
            id="studentExpectation"
            onChange={formik.handleChange}
            value={formik.values.studentExpectation}
          />
          <TextField
            margin="dense"
            label="Lý do"
            type="text"
            fullWidth
            variant="standard"
            name="studentExplanation"
            onChange={formik.handleChange}
            id="studentExplanation"
            value={formik.values.studentExplanation}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button
            type="submit"
            disabled={
              formik.values.studentExpectation === "" ||
              formik.values.studentExplanation === ""
                ? true
                : false
            }
          >
            Gửi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
