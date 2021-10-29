import React, { useState } from "react";
import "./Header.css";
import Card from "@mui/material/Card";
import DialogAddClass from "../DialogAddClass/DialogAddClass";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";

const Header = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  return (
    <Card className="header">
      <h3 className="header__title">Class Room</h3>
      <Button
        sx={{ borderRadius: "50%", marginRight: "1rem" }}
        onClick={handleOpenDialog}
      >
        <Add sx={{ fontSize: 40 }} />
      </Button>
      <DialogAddClass
        handleCloseDialog={handleCloseDialog}
        isOpenDialog={isOpenDialog}
      />
    </Card>
  );
};

export default Header;
