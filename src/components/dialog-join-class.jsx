import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {
  selectJoinClassroomError,
  selectIsJoiningClassroom,
} from "../redux/classrooms/classrooms.selector";
import { joinByInvitationCode } from "../redux/classrooms/classrooms.actions";
import { Typography } from "@mui/material";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  code: Yup.string(),
});

const DialogJoinClass = ({
  handleCloseDialog,
  isOpenDialog,
  joinByInvitationCode,
  joinClassroomErrorMessage,
  isJoining,
}) => {
  const [isChange, setIsChange] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: schema,
  });

  const customHanldeCloseDialog = () => {
    handleCloseDialog();
    setIsChange(true);
    formik.handleReset();
  };

  const handleSubmit = () => {
    setIsChange(false);
    joinByInvitationCode(formik.values.code);
  };

  const handleChange = (e) => {
    formik.handleChange(e);
    setIsChange(true);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpenDialog} onClose={customHanldeCloseDialog} fullWidth>
      {isJoining && (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            zIndex: "99",
            position: "absolute",
          }}
        >
          <CircularProgress style={{ alignSelf: "center", margin: "auto" }} />
        </div>
      )}
      <div style={{ opacity: isJoining ? "0.3" : "1" }}>
        <DialogTitle>
          Tham gia lớp học
          <Typography variant="subtitle1">
            Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào đây.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            name="code"
            label="Mã lớp học"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={formik.values.code}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            onKeyDown={handleKeydown}
          />
          {joinClassroomErrorMessage && !isChange && (
            <Typography sx={{ color: "red" }}>
              {joinClassroomErrorMessage === "Invalid invitation code!" &&
                "Lớp học này không tồn tại"}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={customHanldeCloseDialog}>Huỷ</Button>
          <Button
            disabled={formik.values.code === "" ? true : false}
            onClick={handleSubmit}
          >
            Tham gia
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

const mapState = createStructuredSelector({
  joinClassroomErrorMessage: selectJoinClassroomError,
  isJoining: selectIsJoiningClassroom,
});

const mapDispatch = (dispatch) => ({
  joinByInvitationCode: (inivitationCode) =>
    dispatch(joinByInvitationCode(inivitationCode)),
});

export default connect(mapState, mapDispatch)(DialogJoinClass);
