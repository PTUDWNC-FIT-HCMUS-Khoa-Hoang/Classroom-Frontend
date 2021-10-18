import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./MyClass.css";
const MyClass = ({ name }) => {
  return (
    <Card className="card">
      <CardContent>{name}</CardContent>
    </Card>
  );
};

export default MyClass;
