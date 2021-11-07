import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import { createAClassroom } from "../redux/classroom/classroom.actions";
import { selectUser, selectToken } from "../redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const DialogAddClass = ({
  handleCloseDialog,
  isOpenDialog,
  user,
  token,
  createAClassroom,
}) => {
  const [title, setTittle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createAClassroom(user, title, token);
    handleCloseDialog();
  };

  const handleChange = (e) => {
    setTittle(e.target.value);
  };

  return (
    <Dialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth>
      <DialogTitle>Tạo lớp học</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Tên lớp học"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Huỷ</Button>
        <Button onClick={handleSubmit}>Tạo</Button>
      </DialogActions>
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
