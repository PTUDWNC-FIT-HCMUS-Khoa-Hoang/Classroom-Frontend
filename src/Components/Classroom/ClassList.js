import React, { useEffect, useState } from "react";
import "./ClassList.css";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MyClass from "../MyClass/MyClass";

const ClassList = () => {
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        setClasses(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  return (
    <div className="class-list">
      {isLoading ? (
        <Box className="spinner">
          <CircularProgress />
        </Box>
      ) : error ? (
        <p>Some error</p>
      ) : (
        <List className="class-list-body">
          {classes.map((item) => (
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
