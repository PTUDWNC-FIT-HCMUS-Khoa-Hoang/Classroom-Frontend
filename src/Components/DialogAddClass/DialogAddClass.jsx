import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import "./DialogAddClass.css";

const DialogAddClass = ({ handleCloseDialog, isOpenDialog }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/", { name }).then(() => {
      window.location.reload();
    });
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Dialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth>
      <DialogTitle>Tạo lớp học</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
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

export default DialogAddClass;
