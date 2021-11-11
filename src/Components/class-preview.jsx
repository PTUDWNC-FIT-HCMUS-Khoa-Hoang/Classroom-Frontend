import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: "18.75rem",
    height: "18.75rem",
  },
  card__header: {
    width: "100%",
    height: "35%",
    backgroundColor: "cornflowerblue",
  },
  card__title: {
    fontSize: "1.375rem",
    fontWeight: "bold",
    width: "auto",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const ClassPreview = ({ title, match, index, ownerFullname, user }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.card__header}>
        <CardContent>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`${match.path}/${index}`}
          >
            <Typography variant="span" className={classes.card__title}>
              {title}
            </Typography>
            {ownerFullname !== user.fullname && (
              <Typography>{ownerFullname}</Typography>
            )}
          </Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default withRouter(ClassPreview);
