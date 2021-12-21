import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableContainer from "@mui/material/TableContainer";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import Snackbar from "@mui/material/Snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import Divider from "@mui/material/Divider";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import {
  downloadStudentListService,
  downloadAGradeColumnService,
  updateAGradeForAStudentService,
  downloadGradeBoardByClassroomService,
} from "../../../redux/classroom/classroom.services";
import download from "downloadjs";
import { useRef } from "react";
import {
  uploadStudentList,
  uploadGradeForAnAssignment,
  getGradesByClassroom,
  updateClassroom,
} from "../../../redux/classroom/classroom.actions";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";

const WIDTH_CELL = 130;
const HEIGHT_CELL = 65;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },
  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
    overflow: "hidden",
    textAlign: "left",
    overflowX: "auto",
    width: "100%",
    "& th": {
      padding: 0,
      height: "100%",
      borderRight: "1px solid #e0e0e0",
      borderBottom: "1px solid #e0e0e0",
      borderTop: "1px solid #e0e0e0",
      width: `${WIDTH_CELL}px`,
      position: "sticky",
    },
    "& td": {
      padding: 0,
      borderRight: "1px solid #e0e0e0",
      borderBottom: "1px solid #e0e0e0",
      borderTop: "1px solid #e0e0e0",
      width: `${WIDTH_CELL}px`,
    },

    "& td:first-child": {
      border: "1px solid #e0e0e0",
      width: `${2 * WIDTH_CELL}px`,
    },
    "& th:first-child": {
      border: "1px solid #e0e0e0",
      width: `${2 * WIDTH_CELL}px`,
    },

    "& td:last-child": {
      width: "100%",
      height: "100%",
      borderRight: "1px solid #e0e0e0",
      borderBottom: "1px solid #e0e0e0",
      borderTop: "1px solid #e0e0e0",
    },
    "& th:last-child": {
      width: "100%",
      height: "100%",
      borderRight: "1px solid #e0e0e0",
      borderBottom: "1px solid #e0e0e0",
      borderTop: "1px solid #e0e0e0",
    },
  },
  tableCell: {
    padding: "10px",
    width: `${WIDTH_CELL}px`,
    minHeight: `${HEIGHT_CELL}px`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .moreVertButton": {
      visibility: "hidden",
    },
    "& .moreVertButtonOpen": {
      visibility: "visible",
    },

    "&:hover .moreVertButton": {
      visibility: "visible",
    },

    "&:hover .gradeInfo": {
      visibility: "visible",
    },
    "& .gradeInfo": {
      visibility: "hidden",
      display: "flex",
      flexDirection: "row",
    },
  },
  studentInfo: {
    display: "flex",
    flexDirection: "row",
  },
  studentOptions: {
    display: "flex",
    flexDirection: "column",
  },
});

const defaultCellIndexState = {
  studentIndex: null,
  assignIndex: null,
};

const GradeManagement = () => {
  const classes = useStyles();
  const token = useSelector(({ user }) => user.token);
  const classroomId = useSelector(({ classroom }) => classroom.classroom.id);
  const studentList = useSelector(({ classroom }) => classroom.studentList);
  const gradeStructure = useSelector(
    ({ classroom }) => classroom.gradeStructure
  );
  const gradesArray = useSelector(({ classroom }) => classroom.gradesArray);

  const [studentOptionAnchorEl, setStudentOptionAnchorEl] = useState(null);
  const [studentArray, setStudentArray] = useState([]);
  const [focusedCellIndex, setFocusedCellIndex] = useState(
    defaultCellIndexState
  );
  const [assignAnchorEls, setAssignAnchorEls] = useState(
    Array.from(gradeStructure).fill(null)
  );

  const [canReturnAssign, setCanReturnAssign] = useState(
    Array.from(gradeStructure).fill(false)
  );

  const [assignmentIdToUpload, setAssignmentIdToUpload] = useState(null);

  const [uploadGradeFileIndex, setUploadGradeFileIndex] = useState(null);

  const [finalGrades, setFinalGrades] = useState(
    Array.from(studentList).fill(null)
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const dispatch = useDispatch();

  // first load
  useEffect(() => {
    const dispatchGetGradesByClassroom = () => dispatch(getGradesByClassroom());
    dispatchGetGradesByClassroom();
    gradeStructure.forEach((_, index) => {
      handleChangeGrade(null, index, null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when component did update
  useEffect(() => {
    const buildStudentArray = (studentList, gradeStructure, gradesArray) => {
      const result = studentList.map((student) => ({
        ...student,
        grades: gradeStructure.map((gradeType) => {
          const gradeResult = gradesArray
            ? gradesArray.find(
                (gradeItem) =>
                  gradeItem.studentId === student.studentId &&
                  gradeType._id === gradeItem.gradeId
              )?.grade
            : "";
          return {
            grade: gradeResult,
            gradeTemp: gradeResult,
            isUpdating: false,
            isChange: false,
          };
        }),
      }));
      return result;
    };

    gradeStructure.forEach((_, index) => {
      handleChangeGrade(null, index, null);
    });

    const buildCanReturnAll = () => {
      const result = Array.from(canReturnAssign);
      gradeStructure.forEach((gradeStrItem, index) => {
        let temp = true;
        gradesArray.forEach((gradeItem) => {
          if (gradeStrItem._id === gradeItem.gradeId) {
            if (!gradeItem.grade) temp = false;
          }
        });
        result[index] = temp;
      });
      return result;
    };

    const studentArrayResult = buildStudentArray(
      studentList,
      gradeStructure,
      gradesArray
    );

    const maxGradeReducer = (preValue, curValue) => preValue + curValue.grade;

    const maxGrade = gradeStructure.reduce(maxGradeReducer, 0);

    const calculateFinalGradeReducer = (preValue, curValue, index) => {
      const grade = curValue.grade;
      return preValue + (grade / 100) * gradeStructure[index].grade;
    };

    const calculateFinalGrades = (studentArrayResult) => {
      const result = Array.from(finalGrades).fill(0);
      studentArrayResult.forEach((student, index) => {
        const temp =
          (student.grades.reduce(calculateFinalGradeReducer, 0) / maxGrade) *
          10;
        if (temp) {
          result[index] = Math.round(temp) !== temp ? temp.toFixed(2) : temp;
        }
      });

      return result;
    };
    setFinalGrades(calculateFinalGrades(studentArrayResult));

    setStudentArray(studentArrayResult);
    setCanReturnAssign(buildCanReturnAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeStructure, gradesArray, studentList]);

  useEffect(() => {
    const maxGradeReducer = (preValue, curValue) => preValue + curValue.grade;

    const maxGrade = gradeStructure.reduce(maxGradeReducer, 0);

    const calculateFinalGradeReducer = (preValue, curValue, index) => {
      const grade = curValue.grade;
      return preValue + (grade / 100) * gradeStructure[index].grade;
    };

    const calculateFinalGrades = (studentArrayResult) => {
      const result = Array.from(finalGrades).fill(0);
      studentArrayResult.forEach((student, index) => {
        const temp =
          (student.grades.reduce(calculateFinalGradeReducer, 0) / maxGrade) *
          10;
        if (temp) {
          result[index] = Math.round(temp) !== temp ? temp.toFixed(2) : temp;
        }
      });

      return result;
    };
    setFinalGrades(calculateFinalGrades(studentArray));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentArray]);

  const checkCanReturnAllAssign = (assignIndex) => {
    let result = true;
    studentArray.forEach((student) => {
      result =
        result &&
        !!student.grades[assignIndex].grade &&
        !student.grades[assignIndex].isUpdating;
    });

    return result;
  };

  const changeCanReturnAll = (assignIndex) => {
    const canReturnAllResult = Array.from(canReturnAssign);
    if (checkCanReturnAllAssign(assignIndex)) {
      canReturnAllResult[assignIndex] = true;
      setCanReturnAssign(canReturnAllResult);
    } else if (canReturnAllResult[assignIndex]) {
      canReturnAllResult[assignIndex] = false;
      setCanReturnAssign(canReturnAllResult);
    }
  };

  const handleChangeGrade = (event, assignIndex, studentIndex) => {
    if (event) {
      const result = Array.from(studentArray);
      result[studentIndex].grades[assignIndex].grade = event.target.value;
      result[studentIndex].grades[assignIndex].isChange = true;
      setStudentArray(result);
    }
  };

  const onClickGrade = (studentIndex, assignIndex) => {
    setFocusedCellIndex({ studentIndex, assignIndex });
  };

  const studentOptionOpen = Boolean(studentOptionAnchorEl);

  const handleOpenStudentOption = (event) => {
    setStudentOptionAnchorEl(event.currentTarget);
  };

  const handleCloseStudentOption = () => {
    setStudentOptionAnchorEl(null);
  };

  const assignOptionOpenArray = assignAnchorEls.map((item) => Boolean(item));

  const handleOpenAssignOption = (event, index) => {
    const result = Array.from(assignAnchorEls);
    result[index] = event.currentTarget;
    setAssignAnchorEls(result);
  };

  const handleCloseAssignAnchorEl = (index) => {
    const result = Array.from(assignAnchorEls);
    result[index] = null;
    setAssignAnchorEls(result);
  };

  const inputStudentListRef = useRef(null);
  const inputGradeForAnAssignmentRef = useRef(null);

  const dispatchUploadStudentList = (formData) =>
    dispatch(uploadStudentList(formData));
  const dispatchUploadGradeForAnAssignment = (formData, gradeId) =>
    dispatch(uploadGradeForAnAssignment(formData, gradeId));

  const handleChangeStudentListInputFile = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    handleCloseStudentOption();
    handleUploadStudentListFile(file);
  };

  const handleDownloadGradeBoard = async () => {
    const res = await downloadGradeBoardByClassroomService(classroomId, token);
    const blob = new Blob([res], {
      type: "text/csv",
    });
    download(blob, "grade-board.csv");
  };

  const handleUploadStudentListFile = (file) => {
    const formData = new FormData();
    formData.append("csv", file);
    dispatchUploadStudentList(formData);
  };

  const handleDownloadStudentListFile = async () => {
    handleCloseStudentOption();
    const res = await downloadStudentListService(classroomId, token);
    const blob = new Blob([res], {
      type: "text/csv",
    });
    download(blob, "student-list-template.csv");
  };

  const handleDownloadGradeForAnAssignment = async (gradeId, assignIndex) => {
    handleCloseAssignAnchorEl(assignIndex);
    const res = await downloadAGradeColumnService(classroomId, token, gradeId);
    const blob = new Blob([res], {
      type: "text/csv",
    });
    download(blob, "grade.csv");
  };

  const handleChangeGradeForAssignmentFile = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    handleCloseAssignAnchorEl(uploadGradeFileIndex);
    handleUploadGradeForAnAssignment(file);
  };

  const handleUploadGradeForAnAssignment = (file) => {
    const formData = new FormData();
    formData.append("csv", file);
    dispatchUploadGradeForAnAssignment(formData, assignmentIdToUpload);
    handleChangeGrade(null, uploadGradeFileIndex, null);
  };

  const handleBlurGradeCell = (
    studentIndex,
    assignIndex,
    studentId,
    gradeId
  ) => {
    if (!studentArray[studentIndex].grades[assignIndex].isChange) {
      return;
    }
    const result = Array.from(studentArray);
    const grade = result[studentIndex].grades[assignIndex].grade;

    if (isNaN(grade)) {
      handleChangeGrade(
        {
          target: { value: result[studentIndex].grades[assignIndex].gradeTemp },
        },
        assignIndex,
        studentIndex
      );
      handleAlert();
      return;
    }

    result[studentIndex].grades[assignIndex].isUpdating = true;
    result[studentIndex].grades[assignIndex].isChange = false;
    changeCanReturnAll(assignIndex);
    setStudentArray(result);
    updateAGradeForAStudentService(
      classroomId,
      token,
      studentId,
      gradeId,
      grade
    ).then(() => {
      const result = Array.from(studentArray);
      result[studentIndex].grades[assignIndex].isUpdating = false;
      result[studentIndex].grades[assignIndex].gradeTemp = grade;
      changeCanReturnAll(assignIndex);
      setStudentArray(result);
    });
  };

  const dispatchReturnAll = (data) => dispatch(updateClassroom(data));

  const handleReturnAGrade = (gradeIndex) => {
    handleCloseAssignAnchorEl(gradeIndex);
    const result = Array.from(gradeStructure);
    result[gradeIndex].isFinalized = true;
    dispatchReturnAll({ gradeStructure: result });
  };

  const handleAlert = () => {
    setSnackbarOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const renderNoStudent = () => (
    <div>
      <Typography>Hiện tại bạn chưa có sinh viên nào</Typography>
      <Button
        onClick={() => {
          inputStudentListRef.current.click();
        }}
      >
        Nhấn vào đây để thêm danh sách sinh viên
      </Button>
      <Typography>Hoặc</Typography>
      <Button onClick={handleDownloadStudentListFile}>
        Nhấn vào đây để tải mẫu danh sách sinh viên
      </Button>
    </div>
  );

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className={classes.root}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputStudentListRef}
        accept="csv"
        onChange={handleChangeStudentListInputFile}
      />
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputGradeForAnAssignmentRef}
        accept="csv"
        onChange={handleChangeGradeForAssignmentFile}
      />

      {studentArray.length === 0 ? (
        renderNoStudent()
      ) : (
        <>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={10000}
            onClose={handleCloseAlert}
          >
            <Alert severity="error" onClose={handleCloseAlert}>
              Điểm phải là số!
            </Alert>
          </Snackbar>
          <div className={classes.action}>
            <Button size="large" onClick={handleDownloadGradeBoard}>
              <DownloadIcon sx={{ fontSize: 35 }} />
              Tải về bảng điểm
            </Button>
          </div>
          <TableContainer>
            <table className={classes.table} id="customers">
              <thead>
                <tr>
                  <th>
                    <div
                      style={{ width: `${2 * WIDTH_CELL}px` }}
                      className={classes.tableCell}
                    >
                      <Typography>Sinh viên</Typography>
                      <IconButton
                        className="moreVertButton"
                        onClick={handleOpenStudentOption}
                        style={{
                          visibility: studentOptionOpen ? "visible" : "",
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        open={studentOptionOpen}
                        id="long-menu"
                        onClose={handleCloseStudentOption}
                        MenuListProps={{
                          "aria-labelledby": "student-option-button",
                        }}
                        anchorEl={studentOptionAnchorEl}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <div className={classes.studentOptions}>
                          <MenuItem onClick={handleDownloadStudentListFile}>
                            Download danh sách sinh viên
                          </MenuItem>

                          <MenuItem
                            onClick={() => {
                              inputStudentListRef.current.click();
                            }}
                          >
                            Upload danh sách sinh viên
                          </MenuItem>
                        </div>
                      </Menu>
                    </div>
                  </th>

                  {gradeStructure.map((grade, index) => (
                    <th key={grade._id}>
                      <div className={classes.tableCell}>
                        <div>
                          {grade.title}
                          <Typography>Điểm: {grade.grade}</Typography>
                        </div>
                        <IconButton
                          className={
                            assignOptionOpenArray[index] ? "" : "moreVertButton"
                          }
                          onClick={(event) =>
                            handleOpenAssignOption(event, index)
                          }
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          open={assignOptionOpenArray[index]}
                          onClose={() => handleCloseAssignAnchorEl(index)}
                          anchorEl={assignAnchorEls[index]}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <div className={classes.studentOptions}>
                            <MenuItem
                              onClick={() =>
                                handleDownloadGradeForAnAssignment(
                                  grade._id,
                                  index
                                )
                              }
                            >
                              Download điểm
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setAssignmentIdToUpload(grade._id);
                                setUploadGradeFileIndex(index);
                                inputGradeForAnAssignmentRef.current.click();
                              }}
                            >
                              Upload điểm
                            </MenuItem>
                            <Divider />
                            <MenuItem
                              onClick={() => handleReturnAGrade(index)}
                              disabled={!canReturnAssign[index]}
                            >
                              Trả lại tất cả
                            </MenuItem>
                          </div>
                        </Menu>
                      </div>
                    </th>
                  ))}

                  <th>
                    <div
                      className={classes.tableCell}
                      style={{ justifyContent: "center" }}
                    >
                      <div>Tổng kết</div>
                    </div>
                  </th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {studentArray.map((student, studentIndex) => (
                  <tr key={student._id}>
                    <td>
                      <div
                        className={classes.tableCell}
                        style={{ width: `${2 * WIDTH_CELL}px` }}
                      >
                        <div className={classes.studentInfo}>
                          <AccountCircleIcon
                            sx={{ mr: 2, fill: "cornflowerblue" }}
                            fontSize="large"
                          />
                          <Typography
                            sx={{ alignSelf: "center", fontWeight: "bold" }}
                          >
                            {student.studentName}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    {gradeStructure.map((grade, assignIndex) => (
                      <td key={`${student._id}-${grade._id}`}>
                        <div
                          className={classes.tableCell}
                          onClick={() =>
                            onClickGrade(studentIndex, assignIndex)
                          }
                          onBlur={() => {
                            setFocusedCellIndex(defaultCellIndexState);
                            handleBlurGradeCell(
                              studentIndex,
                              assignIndex,
                              student.studentId,
                              grade._id
                            );
                          }}
                        >
                          <div
                            className="gradeInfo"
                            style={{
                              visibility:
                                student.grades[assignIndex].grade ||
                                (focusedCellIndex.studentIndex ===
                                  studentIndex &&
                                  focusedCellIndex.assignIndex ===
                                    assignIndex) ||
                                student.grades[assignIndex].isUpdating
                                  ? "visible"
                                  : "",
                            }}
                          >
                            <TextField
                              sx={{ textAlign: "left" }}
                              variant="standard"
                              value={student.grades[assignIndex].grade}
                              helperText={
                                !grade.isFinalized
                                  ? student.grades[assignIndex].isUpdating
                                    ? "Đang lưu..."
                                    : student.grades[assignIndex].grade &&
                                      (focusedCellIndex.studentIndex !==
                                        studentIndex ||
                                        focusedCellIndex.assignIndex !==
                                          assignIndex)
                                    ? "Bản nháp"
                                    : ""
                                  : ""
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    /100
                                  </InputAdornment>
                                ),
                              }}
                              onChange={(event) =>
                                handleChangeGrade(
                                  event,
                                  assignIndex,
                                  studentIndex
                                )
                              }
                            />
                          </div>
                        </div>
                      </td>
                    ))}

                    <td>
                      <div
                        className={classes.tableCell}
                        style={{ justifyContent: "center" }}
                      >
                        <div className={classes.studentInfo}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {finalGrades[studentIndex]}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td />
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default GradeManagement;
