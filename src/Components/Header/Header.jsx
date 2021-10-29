import React, { useState } from "react";
import "./Header.css";
import DialogAddClass from "../DialogAddClass/DialogAddClass";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

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
        sx={{
          borderRadius: "50%",
          marginRight: "1rem",
          fontSize: "35px",
        }}
        onClick={handleOpenDialog}
      >
        +
      </Button>
      <DialogAddClass
        handleCloseDialog={handleCloseDialog}
        isOpenDialog={isOpenDialog}
      />
    </Card>
  );
};

export default Header;
