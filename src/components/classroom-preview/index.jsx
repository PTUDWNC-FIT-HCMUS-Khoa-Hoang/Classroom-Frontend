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

const ClassroomPreview = ({ title, match, _id, owner, user }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.card__header}>
        <CardContent>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`${match.path}/${_id}`}
          >
            <Typography variant="span" className={classes.card__title}>
              {title}
            </Typography>
            {owner._id !== user._id && (
              <Typography>{owner.fullname}</Typography>
            )}
          </Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default withRouter(ClassroomPreview);
