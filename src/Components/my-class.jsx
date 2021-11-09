import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: "18.75rem",
    height: "18.75rem",
  },
  card__header: {
    width: "100%",
    height: "7rem",
    backgroundColor: "cornflowerblue",
  },
  card__title: {
    fontSize: "1.375rem",
    width: "auto",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const MyClass = ({ title, match, _id }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.card__header}>
        <CardContent>
          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`${match.path}/${_id}`}
            >
              <span className={classes.card__title}>{title}</span>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default withRouter(MyClass);
