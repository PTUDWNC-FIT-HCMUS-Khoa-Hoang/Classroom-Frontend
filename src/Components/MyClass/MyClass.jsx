import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./MyClass.css";
const MyClass = ({ name }) => {
  return (
    <Card className="card">
      <div className="card__header">
        <CardContent>
          <Typography sx={{ fontSize: "1.375rem", color: "white" }}>
            {name}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default MyClass;
