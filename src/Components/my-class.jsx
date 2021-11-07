import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  card: {
    width: "18.75rem",
    height: "18.75rem",
  },
  card__header: {
    width: "100%",
    height: "7rem",
    backgroundColor: "blue",
  },
});

const MyClass = ({ title }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.card__header}>
        <CardContent>
          <Typography sx={{ fontSize: "1.375rem", color: "white" }}>
            {title}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default MyClass;
