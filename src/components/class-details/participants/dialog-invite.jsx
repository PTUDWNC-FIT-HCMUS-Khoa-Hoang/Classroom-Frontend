import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import * as Yup from "yup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CircularProgress from "@mui/material/CircularProgress";
import { createInvitationService } from "../../../redux/classrooms/classrooms.services";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import { Button, Typography } from "@mui/material";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});

const useStyles = makeStyles({
  inviteLinkWrapper: {
    marginBottom: "10px",
  },
  inviteLinkWrapper__link: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const DialogInvite = ({
  isOpenDialog,
  dialogTitle,
  handleCloseDialog,
  invitationCode,
  classroomId,
  token,
}) => {
  const classes = useStyles();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      setIsSending(true);

      createInvitationService(
        {
          userEmail: values.email,
          classroomId,
          role: invitationCode ? "student" : "teacher",
        },
        token
      )
        .then(() => {
          setIsSending(false);
          handleCloseDialog();
          resetForm();
        })
        .catch((err) => {
          setIsSending(false);
          setError(err.response.data.message);
          resetForm();
        });
    },
  });

  const link =
    window.location.origin +
    "/join/" +
    classroomId +
    "?invitationCode=" +
    invitationCode;
  const clickToCopy = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Dialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth>
      {isSending && (
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
      <div style={{ opacity: isSending ? "0.3" : "1" }}>
        <DialogTitle>{dialogTitle} </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {invitationCode && (
              <div className={classes.inviteLinkWrapper}>
                <Typography variant="subtitle">Đường liên kết mời</Typography>
                <div className={classes.inviteLinkWrapper__link}>
                  <Typography
                    id="123"
                    variant="body1"
                    sx={{
                      mt: 1,
                      display: "inline-block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      opacity: "0.5",
                    }}
                  >
                    {link}
                  </Typography>
                  <Button onClick={clickToCopy}>
                    <ContentCopyIcon />
                  </Button>
                </div>
                <Divider sx={{ mt: 2 }} />
              </div>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Nhập email"
              type="email"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Huỷ</Button>
            <Button type="submit" disabled={formik.values.email === ""}>
              Mời
            </Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default DialogInvite;
