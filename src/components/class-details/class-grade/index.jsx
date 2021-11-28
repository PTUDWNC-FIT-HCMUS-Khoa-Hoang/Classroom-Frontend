import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updateClassroom } from "../../../../redux/classroom/classroom.actions";

const schema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập"),
  grade: Yup.string().required("Vui lòng nhập"),
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
    backgroundColor: "lightgray",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 0px",
  },
  gradeList: {
    width: "100%",
  },
  gradeItemWrapper: {
    display: "flex",
    flexDirection: "row",
    height: "200px",
    justifyContent: "space-between",
    width: "700px",
  },
  gradeItem: {
    margin: "30px",
    width: "520px",
  },
  gradeAction: {},
});

const defaultValues = {
  id: "",
  title: "",
  grade: "",
  isUpdate: false,
  error: { title: false, grade: false },
};

const GradeStructure = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dispatchUpdateClassroom = (data) => dispatch(updateClassroom(data));
  const [id, setId] = useState(0);
  const [gradeList, setGradeList] = useState([]);
  const [canSave, setCanSave] = useState(true);
  const gradeStructure = useSelector(
    ({ classroom }) => classroom.classroom?.gradeStructure
  );

  useEffect(() => {
    buildInitialGradeList();
    setId(gradeList.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeStructure]);

  const buildInitialGradeList = () => {
    setGradeList(
      gradeStructure.map((item, index) => ({
        ...defaultValues,
        ...item,
        id: index.toString(),
      }))
    );
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      grade: "",
    },
    validationSchema: schema,
    onSubmit: (_, { resetForm }) => {
      resetForm();
    },
  });

  const onClickSave = () => {
    dispatchUpdateClassroom({ gradeStructure: gradeList });
  };

  const onClickUpdate = (index) => {
    const result = Array.from(gradeList);
    const item = { ...result[index], isUpdate: !result[index].isUpdate };
    result.splice(index, 1, item);
    setGradeList(result);
    setCanSave(false);
  };

  const onClickDelete = (index) => {
    const result = Array.from(gradeList);
    result.splice(index, 1);
    setGradeList(result);
  };

  const onClickSaveGradeItem = (index) => {
    setCanSave(true);
    setGradeList(
      gradeList.map((item, i) => {
        if (i !== index) {
          if (item.isUpdate === true) {
            setCanSave(false);
          }
          return item;
        }

        let error = { title: false, grade: false };
        let isUpdate = false;
        if (item.title === "") {
          error.title = true;
          isUpdate = true;
        }
        if (item.grade === "") {
          error.grade = true;
          isUpdate = true;
        }
        setCanSave(!isUpdate);
        return {
          ...item,
          error,
          isUpdate,
        };
      })
    );
  };

  const generateId = () => {
    const result = id;
    setId(id + 1);
    return result;
  };

  const onHandleAddGrade = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
    const { title, grade } = formik.values;
    if (title !== "" && grade !== "") {
      addMoreGrade(title, grade);
    }
  };

  const addMoreGrade = (title, grade) => {
    const result = Array.from(gradeList);
    const item = {
      ...defaultValues,
      id: generateId().toString(),
      title,
      grade,
    };
    result.push(item);
    setGradeList(result);
  };

  const onChange = (index, event) => {
    setGradeList(
      gradeList.map((item, i) => {
        if (i !== index) return item;

        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      })
    );
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [itemRemoved] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, itemRemoved);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const list = reorder(
      gradeList,
      result.source.index,
      result.destination.index
    );

    setGradeList(list);
  };

  const getItemStyle = (_, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "10px",
    margin: `0 0 30px 0`,

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <div className={classes.root}>
      <Card className={classes.wrapper}>
        <CardContent>
          <DragDropContext className={classes.gradeList} onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {gradeList.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <form className={classes.gradeItemWrapper}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <TextField
                                className={classes.gradeItem}
                                sx={{ mt: 2, mx: 2 }}
                                name="title"
                                label="Tên"
                                defaultValue={item.title}
                                onChange={(e) => onChange(index, e)}
                                disabled={!item.isUpdate}
                                error={item.error.title}
                                helperText={item.error.title && "Vui lòng nhập"}
                              ></TextField>
                              <TextField
                                className={classes.gradeItem}
                                sx={{ mb: 2, mx: 2 }}
                                label="Điểm"
                                name="grade"
                                defaultValue={item.grade}
                                onChange={(e) => onChange(index, e)}
                                disabled={!item.isUpdate}
                                error={item.error.grade}
                                helperText={item.error.grade && "Vui lòng nhập"}
                              ></TextField>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Button
                                sx={{ flex: 1 }}
                                variant="contained"
                                color={item.isUpdate ? "success" : "primary"}
                                onClick={() => {
                                  !item.isUpdate
                                    ? onClickUpdate(index)
                                    : onClickSaveGradeItem(index);
                                }}
                              >
                                {item.isUpdate ? <SaveIcon /> : <CreateIcon />}
                              </Button>
                              <Button
                                sx={{ flex: 1 }}
                                variant="contained"
                                color="error"
                                onClick={() => {
                                  onClickDelete(index);
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            </Box>
                          </form>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <Card
                    sx={{
                      padding: "10px",
                    }}
                  >
                    <form
                      className={classes.gradeItemWrapper}
                      onSubmit={onHandleAddGrade}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextField
                          className={classes.gradeItem}
                          sx={{ mt: 2, mx: 2 }}
                          label="Tên"
                          id="title"
                          name="title"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.title && Boolean(formik.errors.title)
                          }
                          helperText={
                            formik.touched.title && formik.errors.title
                          }
                        ></TextField>
                        <TextField
                          className={classes.gradeItem}
                          sx={{ mb: 2, mx: 2 }}
                          label="Điểm"
                          id="grade"
                          name="grade"
                          value={formik.values.grade}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.grade && Boolean(formik.errors.grade)
                          }
                          helperText={
                            formik.touched.grade && formik.errors.grade
                          }
                        ></TextField>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Button
                          sx={{ flex: 1 }}
                          variant="contained"
                          type="submit"
                          color="success"
                        >
                          <AddIcon />
                        </Button>
                      </Box>
                    </form>
                  </Card>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
        <CardActions sx={{ width: "80%", justifyContent: "flex-end" }}>
          <Button
            disabled={!canSave || gradeList.length === 0}
            variant="contained"
            size="large"
            color="success"
            onClick={onClickSave}
          >
            Lưu
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default GradeStructure;
