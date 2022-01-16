import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function GradeReviewDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Phúc khảo điểm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Hãy nói rõ lý do bạn muốn phúc khảo với giáo viên
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="grade"
          label="Điểm mong muốn"
          type="number"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="name"
          label="Lý do"
          type="text"
          fullWidth
          variant="standard"
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Huỷ</Button>
        <Button onClick={handleClose}>Gửi</Button>
      </DialogActions>
    </Dialog>
  );
}
