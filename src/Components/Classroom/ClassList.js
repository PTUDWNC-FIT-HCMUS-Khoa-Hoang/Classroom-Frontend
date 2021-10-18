import React, { useEffect, useState } from "react";
import "./ClassList.css";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MyClass from "../MyClass/MyClass";

const ClassList = () => {
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(null);
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
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/", { name }).then(() => {
      window.location.reload();
    });
  };
  return (
    <div className="class-list">
      {isLoading ? (
        <Box className="spinner">
          <CircularProgress />
        </Box>
      ) : error ? (
        <p>Some error</p>
      ) : (
        <>
          <List className="class-list-body">
            {classes.map((item) => (
              <ListItem key={item.ID} somthing={item.ID} className="my-class">
                <MyClass {...item} />
              </ListItem>
            ))}
          </List>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              onChange={handleChange}
            />
            <Button type="submit" variant="outlined">
              +
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ClassList;
