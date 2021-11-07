import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MyClass from "./MyClass";

const useStyles = makeStyles({
  classList: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "1rem",
  },
  classList__body: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
  },
  spinner: {
    alignSelf: "center",
    width: "100%",
    margin: "auto",
  },
});

const ClassList = ({ token, currentUser }) => {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [classerooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: "/classrooms/owned",
      data: currentUser,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        setClassrooms(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [currentUser, token]);

  return (
    <div className={classes.classList}>
      {isLoading ? (
        <Box className={classes.spinner}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <p>Some error</p>
      ) : (
        <List className={classes.classList__body}>
          {classerooms.map((item) => (
            <ListItem key={item.ID} sx={{ width: "auto" }}>
              <MyClass {...item} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ClassList;
