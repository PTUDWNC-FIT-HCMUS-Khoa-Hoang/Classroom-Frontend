import React, { useState, useEffect } from "react";
import { MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableContainer from "@mui/material/TableContainer";
import Menu from "@mui/material/Menu";
import GradeReviewDialog from "./dialog-grade-review";
import { useSelector, useDispatch } from "react-redux";
import { getGradesByClassroom } from "../../../../redux/classroom/classroom.actions";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";
const WIDTH_CELL = 130;
const HEIGHT_CELL = 65;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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

const StudentGradeManagement = ({ user, classroomId }) => {
  const classes = useStyles();

  const gradeStructure = useSelector(
    ({ classroom }) => classroom.gradeStructure
  );
  const gradesArray = useSelector(({ classroom }) => classroom.gradesArray);
  const [gradeFinal, setGradeFinal] = useState([{}]);
  const [canViewGrade, setCanViewGrade] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isAllFinalized, setIsAllFinalized] = useState(false);
  const [finalGrade, setFinalGrade] = useState(NaN);
  const [gradeStructureReviewID, setGradeStructureReviewID] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const error = useSelector(({ user }) => user.error);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [gradeAnchorEls, setGradeAnchorEls] = useState(
    Array.from(gradeStructure).fill(null)
  );
  const gradeOptionOpenArray = gradeAnchorEls.map((item) => Boolean(item));

  const dispatch = useDispatch();
  // first load
  useEffect(() => {
    const dispatchGetGradesByClassroom = () => dispatch(getGradesByClassroom());
    dispatchGetGradesByClassroom();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let canViewGradeResult = false;
    const gradeFinalResult = Array.from(gradeStructure).fill({});
    let isAllFinalizedTemp = true;
    let finalGradeTemp = 0;
    let allComposition = 1;
    gradeStructure.forEach((grade, index) => {
      const found = gradesArray.find(
        (gradeItem) => gradeItem.gradeId === grade._id
      );
      if (found) {
        gradeFinalResult[index]["grade"] = found.grade;
        finalGradeTemp += found.grade * grade.grade;
        allComposition += grade.grade;
      }
      if (grade.isFinalized) {
        canViewGradeResult = true;
        gradeFinalResult[index]["canView"] = true;
      } else isAllFinalizedTemp = false;
    });
    if (isAllFinalizedTemp) setIsAllFinalized(true);
    if (canViewGrade !== canViewGradeResult)
      setCanViewGrade(canViewGradeResult);
    setGradeFinal(gradeFinalResult);
    setFinalGrade(finalGradeTemp / allComposition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradesArray, gradeStructure]);

  const handleOpenGradeOption = (event, index) => {
    const result = Array.from(gradeAnchorEls);
    result[index] = event.currentTarget;
    setGradeAnchorEls(result);
  };

  const handleCloseGradeOption = (index) => {
    const result = Array.from(gradeAnchorEls);
    result[index] = null;
    setGradeAnchorEls(result);
    setGradeStructureReviewID(gradesArray[index]?._id);
  };
  const renderNoGrade = () => <div>Xin lỗi, giáo viên chưa up điểm</div>;
  return (
    <>
      {canViewGrade ? (
        <div className={classes.root}>
          <GradeReviewDialog
            open={openDialog}
            handleClose={handleCloseDialog}
            gradeId={gradeStructureReviewID}
          />
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
          <TableContainer>
            <table className={classes.table} id="customers">
              <thead>
                <tr>
                  <th>
                    <div
                      style={{ width: `${2 * WIDTH_CELL}px` }}
                      className={classes.tableCell}
                    >
                      <Typography>Họ và tên</Typography>
                    </div>
                  </th>
                  {gradeStructure.map((grade) => (
                    <th key={grade._id}>
                      <div className={classes.tableCell}>
                        <div>
                          {grade.title}
                          <Typography>Điểm: {grade.grade}</Typography>
                        </div>
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
                <tr>
                  <td>{user.fullname}</td>

                  {gradeFinal.map((gradeFinalItem, index) => (
                    <td>
                      <div className={classes.tableCell}>
                        {gradeFinalItem.canView ? (
                          <>
                            <div>{gradeFinalItem.grade} /100</div>
                            <IconButton
                              className={
                                gradeOptionOpenArray[index]
                                  ? ""
                                  : "moreVertButton"
                              }
                              onClick={(event) =>
                                handleOpenGradeOption(event, index)
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              open={gradeOptionOpenArray[index]}
                              onClose={() => handleCloseGradeOption(index)}
                              anchorEl={gradeAnchorEls[index]}
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
                                  onClick={() => {
                                    handleOpenDialog();
                                    handleCloseGradeOption(index);
                                  }}
                                >
                                  Yêu cầu phúc khảo
                                </MenuItem>
                              </div>
                            </Menu>
                          </>
                        ) : (
                          "Chưa có điểm"
                        )}
                      </div>
                    </td>
                  ))}

                  <td>
                    <div
                      className={classes.tableCell}
                      style={{ justifyContent: "center" }}
                    >
                      {isAllFinalized
                        ? finalGrade
                        : "Giáo viên chưa nhập hết điểm"}
                    </div>
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </TableContainer>
        </div>
      ) : (
        renderNoGrade()
      )}
    </>
  );
};

export default StudentGradeManagement;
