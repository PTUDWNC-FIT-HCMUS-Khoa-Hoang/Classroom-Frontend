import React, { useState } from "react";
import "./Header.css";
import AddClassButton from "../AddClassButton/AddClassButton";
import Card from "@mui/material/Card";
import DialogAddClass from "../DialogAddClass/DialogAddClass";

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
      <AddClassButton handleOpenDialog={handleOpenDialog} />
      <DialogAddClass
        handleCloseDialog={handleCloseDialog}
        isOpenDialog={isOpenDialog}
      />
    </Card>
  );
};

export default Header;
