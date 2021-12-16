import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
// import DownloadIcon from "@mui/icons-material/Download";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableContainer from "@mui/material/TableContainer";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import {
  downloadStudentListService,
  downloadAGradeColumnService,
  updateAGradeForAStudentService,
} from "../../../redux/classroom/classroom.services";
import download from "downloadjs";
import { useRef } from "react";
import {
  uploadStudentList,
  uploadGradeForAnAssignment,
} from "../../../redux/classroom/classroom.actions";
import { useCallback } from "react";
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

  const buildStudentArray = useCallback(
    (studentList, gradeStructure) =>
      studentList.map((student) => ({
        ...student,
        grades: gradeStructure.map(() => ({
          grade: "",
          isUpdating: false,
          isChange: false,
        })),
      })),
    []
  );

  useEffect(() => {
    setStudentArray(buildStudentArray(studentList, gradeStructure));
  }, [buildStudentArray, gradeStructure, studentList]);

  const [studentOptionAnchorEl, setStudentOptionAnchorEl] = useState(null);
  const [studentArray, setStudentArray] = useState(
    buildStudentArray(studentList, gradeStructure)
  );
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

  const checkCanReturnAllAssign = (assignIndex) => {
    let result = true;
    studentArray.forEach((student) => {
      result = result && !!student.grades[assignIndex].grade;
    });
    return result;
  };

  const handleChangeGrade = (event, assignIndex, studentIndex) => {
    const result = Array.from(studentArray);
    result[studentIndex].grades[assignIndex].grade = event.target.value;
    result[studentIndex].grades[assignIndex].isChange = true;
    setStudentArray(result);

    const canReturnAllResult = Array.from(canReturnAssign);
    if (checkCanReturnAllAssign(assignIndex)) {
      canReturnAllResult[assignIndex] = true;
      setCanReturnAssign(canReturnAllResult);
    } else if (canReturnAllResult[assignIndex]) {
      canReturnAllResult[assignIndex] = false;
      setCanReturnAssign(canReturnAllResult);
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

  const dispatch = useDispatch();
  const dispatchUploadStudentList = (formData) =>
    dispatch(uploadStudentList(formData));
  const dispatchUploadGradeForAnAssignment = (formData, gradeId) =>
    dispatch(uploadGradeForAnAssignment(formData, gradeId));

  const handleStudentListInputFileChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    handleCloseStudentOption();
    handleUploadStudentListFile(file);
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

  const handleGradeForAssignmentFileChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null;
    handleCloseStudentOption();
    handleUploadGradeForAnAssignment(file);
  };

  const handleUploadGradeForAnAssignment = (file) => {
    const formData = new FormData();
    formData.append("csv", file);
    dispatchUploadGradeForAnAssignment(formData, assignmentIdToUpload);
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
    result[studentIndex].grades[assignIndex].isUpdating = true;
    result[studentIndex].grades[assignIndex].isChange = false;

    setStudentArray(result);
    const grade = result[studentIndex].grades[assignIndex].grade;
    updateAGradeForAStudentService(
      classroomId,
      token,
      studentId,
      gradeId,
      grade
    ).then(() => {
      const result = Array.from(studentArray);
      result[studentIndex].grades[assignIndex].isUpdating = false;
      setStudentArray(result);
    });
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
  return (
    <div className={classes.root}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputStudentListRef}
        accept="csv"
        onChange={handleStudentListInputFileChange}
      />
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputGradeForAnAssignmentRef}
        accept="csv"
        onChange={handleGradeForAssignmentFileChange}
      />
      {/* <div className={classes.action}>
        <IconButton size="large">
          <DownloadIcon sx={{ fontSize: 35 }} />
        </IconButton>

        <IconButton size="large">
          <FileUploadIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </div> */}
      {studentArray.length === 0 ? (
        renderNoStudent()
      ) : (
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
                      style={{ visibility: studentOptionOpen ? "visible" : "" }}
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
                  <th>
                    <div className={classes.tableCell}>
                      <div className={classes.tableCell_info}>
                        {grade.title}
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
                              inputGradeForAnAssignmentRef.current.click();
                            }}
                          >
                            Upload điểm
                          </MenuItem>
                          <Divider />
                          <MenuItem disabled={!canReturnAssign[index]}>
                            Trả lại tất cả
                          </MenuItem>
                        </div>
                      </Menu>
                    </div>
                  </th>
                ))}

                <th />
              </tr>
            </thead>
            <tbody>
              {studentArray.map((student, studentIndex) => (
                <tr>
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
                    <td>
                      <div
                        className={classes.tableCell}
                        onClick={() => onClickGrade(studentIndex, assignIndex)}
                        onBlur={() => {
                          setFocusedCellIndex(defaultCellIndexState);
                          handleBlurGradeCell(
                            studentIndex,
                            assignIndex,
                            student._id,
                            grade._id
                          );
                        }}
                      >
                        <div
                          className="gradeInfo"
                          style={{
                            visibility:
                              student.grades[assignIndex].grade ||
                              (focusedCellIndex.studentIndex === studentIndex &&
                                focusedCellIndex.assignIndex === assignIndex) ||
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
                              student.grades[assignIndex].isUpdating
                                ? "Đang lưu"
                                : student.grades[assignIndex].grade &&
                                  (focusedCellIndex.studentIndex !==
                                    studentIndex ||
                                    focusedCellIndex.assignIndex !==
                                      assignIndex)
                                ? "Đã lưu bản nháp"
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

                  <td />
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      )}
    </div>
  );
};

export default GradeManagement;
