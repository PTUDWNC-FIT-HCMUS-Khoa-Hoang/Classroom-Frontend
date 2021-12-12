import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableContainer from "@mui/material/TableContainer";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";

const WIDTH_CELL = 130;
const HEIGHT_CELL = 65;

const dummy_assignment = [
  "test 1",
  "test 2",
  "test 3",
  "test 3",
  "test 3",
  "test 3",

  "test 3",

  "test 3",

  "test 3",
];

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

const GradeManagement = () => {
  const classes = useStyles();

  const [studentAnchorEl, setStudentAnchorEl] = useState(null);
  const [studentGrade, setStudentGrade] = useState(
    Array.from(dummy_assignment).fill(null)
  );
  const [focusedGradeIndex, setFocusedGradeIndex] = useState(null);
  const handleChangeGrade = (event, index) => {
    const result = Array.from(studentGrade);
    result[index] = event.target.value;
    setStudentGrade(result);
  };
  const onClickGrade = (index) => {
    setFocusedGradeIndex(index);
  };

  const [assignAnchorEls, setAssignAnchorEls] = useState(
    Array.from(dummy_assignment).fill(null)
  );

  const studentOptionOpen = Boolean(studentAnchorEl);
  const handleOpenStudentOption = (event) => {
    setStudentAnchorEl(event.currentTarget);
  };
  const handleCloseStudentOption = () => {
    setStudentAnchorEl(null);
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

  return (
    <div className={classes.root}>
      <div className={classes.action}>
        <IconButton size="large">
          <DownloadIcon sx={{ fontSize: 35 }} />
        </IconButton>
        <IconButton size="large">
          <FileUploadIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </div>
      <TableContainer>
        <table className={classes.table} id="customers">
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
                  MenuListProps={{ "aria-labelledby": "student-option-button" }}
                  anchorEl={studentAnchorEl}
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
                    <MenuItem>Download danh sánh sinh viên</MenuItem>
                    <MenuItem>Upload danh sách sinh viên</MenuItem>
                  </div>
                </Menu>
              </div>
            </th>

            {dummy_assignment.map((item, index) => (
              <th>
                <div className={classes.tableCell}>
                  <div className={classes.tableCell_info}>{item}</div>
                  <IconButton
                    className={assignOptionOpen[index] ? "" : "moreVertButton"}
                    onClick={(event) => handleOpenAssignOption(event, index)}
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
                      <MenuItem disabled={!studentGrade[index]}>
                        Trả lại tất cả
                      </MenuItem>
                    </div>
                  </Menu>
                </div>
              </th>
            ))}

            <th />
          </tr>
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
                  <Typography sx={{ alignSelf: "center", fontWeight: "bold" }}>
                    Vo Nguyen Le Hoang
                  </Typography>
                </div>
              </div>
            </td>

            {dummy_assignment.map((_, index) => (
              <td>
                <div
                  className={classes.tableCell}
                  onClick={() => onClickGrade(index)}
                  onBlur={() => setFocusedGradeIndex(null)}
                >
                  <div
                    className="gradeInfo"
                    style={{
                      visibility:
                        studentGrade[index] || focusedGradeIndex === index
                          ? "visible"
                          : "",
                    }}
                  >
                    <Input
                      sx={{ width: "70px" }}
                      onChange={(event) => handleChangeGrade(event, index)}
                      endAdornment={
                        <InputAdornment position="end">/100</InputAdornment>
                      }
                    ></Input>
                  </div>
                </div>
              </td>
            ))}

            <td />
          </tr>
        </table>
      </TableContainer>
    </div>
  );
};

export default GradeManagement;
