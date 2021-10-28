import React from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import "./AddClassButton.css";

const AddClassButton = ({ handleOpenDialog }) => {
  return (
    <Button onClick={handleOpenDialog}>
      <Add sx={{ fontSize: 40 }} className="add-button" />
    </Button>
  );
};

export default AddClassButton;
