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
import Input from "@mui/material/Input";
import { useSelector, useDispatch } from "react-redux";
import { downloadStudentListService } from "../../../redux/classroom/classroom.services";
import download from "downloadjs";
import { useRef } from "react";
import { uploadStudentList } from "../../../redux/classroom/classroom.actions";
import { useCallback } from "react";
import { useEffect } from "react";

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

  const buildStudentArray = useCallback((studentList, gradeStructure) => {
    return studentList.map((student) => ({
      ...student,
      grade: Array.from(gradeStructure).fill(""),
    }));
  }, []);

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

  const [canReturnAssignArray, setCanReturnAssignArray] = useState(
    Array.from(gradeStructure).fill(false)
  );

  const checkCanReturnAllAssign = (assignIndex) => {
    let result = true;
    studentArray.forEach((student) => {
      result = result && !!student.grade[assignIndex];
    });
    return result;
  };

  const handleChangeGrade = (event, assignIndex, studentIndex) => {
    const result = Array.from(studentArray);
    result[studentIndex].grade[assignIndex] = event.target.value;
    setStudentArray(result);
    const canReturnAllResult = Array.from(canReturnAssignArray);
    if (checkCanReturnAllAssign(assignIndex)) {
      canReturnAllResult[assignIndex] = true;
      setCanReturnAssignArray(canReturnAllResult);
    } else if (canReturnAllResult[assignIndex]) {
      canReturnAllResult[assignIndex] = false;
      setCanReturnAssignArray(canReturnAllResult);
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

  const assignOptionOpen = assignAnchorEls.map((item) => Boolean(item));

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

  const inputFileRef = useRef(null);

  const dispatch = useDispatch();
  const dispatchUploadStudentList = (formData) =>
    dispatch(uploadStudentList(formData));

  const handleFileChange = (event) => {
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

  const renderNoStudent = () => (
    <div>
      <Typography>Hiện tại bạn chưa có sinh viên nào</Typography>
      <Button
        onClick={() => {
          inputFileRef.current.click();
        }}
      >
        nhấn vào đây để thêm danh sách sinh viên
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={inputFileRef}
        accept="csv"
        onChange={handleFileChange}
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
                            inputFileRef.current.click();
                          }}
                        >
                          Upload danh sách sinh viên
                        </MenuItem>
                      </div>
                    </Menu>
                  </div>
                </th>

                {gradeStructure.map((item, index) => (
                  <th>
                    <div className={classes.tableCell}>
                      <div className={classes.tableCell_info}>{item.title}</div>
                      <IconButton
                        className={
                          assignOptionOpen[index] ? "" : "moreVertButton"
                        }
                        onClick={(event) =>
                          handleOpenAssignOption(event, index)
                        }
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        open={assignOptionOpen[index]}
                        id="long-menu"
                        onClose={() => handleCloseAssignAnchorEl(index)}
                        MenuListProps={{
                          "aria-labelledby": "student-option-button",
                        }}
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
                          <MenuItem>Download điểm</MenuItem>
                          <MenuItem>Upload điểm</MenuItem>
                          <Divider />
                          <MenuItem disabled={!canReturnAssignArray[index]}>
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

                  {gradeStructure.map((_, assignIndex) => (
                    <td>
                      <div
                        className={classes.tableCell}
                        onClick={() => onClickGrade(studentIndex, assignIndex)}
                        onBlur={() =>
                          setFocusedCellIndex(defaultCellIndexState)
                        }
                      >
                        <div
                          className="gradeInfo"
                          style={{
                            visibility:
                              studentArray[studentIndex].grade[assignIndex] ||
                              (focusedCellIndex.studentIndex === studentIndex &&
                                focusedCellIndex.assignIndex === assignIndex)
                                ? "visible"
                                : "",
                          }}
                        >
                          <Input
                            sx={{ width: "70px" }}
                            onChange={(event) =>
                              handleChangeGrade(
                                event,
                                assignIndex,
                                studentIndex
                              )
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                /100
                              </InputAdornment>
                            }
                          ></Input>
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
