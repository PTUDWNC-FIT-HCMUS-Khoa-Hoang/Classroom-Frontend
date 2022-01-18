import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAGradeReviewService,
  readNotificationService,
} from "../../redux/user/user.services";
import { useParams } from "react-router";
import { replyAGradeReview } from "../../redux/user/user.action";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 300px",
  },
  body: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  info: {
    display: "flex",
  },
  table: {
    "& th": {
      width: "157px",
    },
  },
  actions: {
    justifyContent: "flex-end",
    width: "100%",
  },
  explanation: {
    width: "100%",
  },
});

const GradeReviewDetail = () => {
  const classes = useStyles();
  const [isKeepGrade, setIsKeepGrade] = useState(true);
  const [isFinalDecision, setIsFinalDecision] = useState(false);
  const [fetchData, setFetchData] = useState({});

  const commentRef = useRef(null);
  const gradeRef = useRef(null);
  const dispatch = useDispatch();
  const token = useSelector(({ user }) => user.token);
  const { id } = useParams();
  const history = useHistory();
  const user = useSelector(({ user }) => user.user);
  useEffect(() => {
    readNotificationService(token, id)
      .then(() => console.log("ok"))
      .catch(() => console.log("not ok"));
    fetchAGradeReviewService(token, id)
      .then((data) => {
        setFetchData(data);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatchReply = (data, id) => dispatch(replyAGradeReview(data, id));
  const handleSubmit = () => {
    const data2Send = {
      teacherComment: commentRef?.current.target,
      isFinalDecision,
    };
    if (!isKeepGrade) {
      data2Send["upgradedGrade"] = gradeRef?.current.value;
    }
    dispatchReply(data2Send, id);
    history.goBack();
  };

  const handleCheckKeepGrade = () => {
    setIsKeepGrade(!isKeepGrade);
  };

  const handleCheckIsFinalDecision = () => {
    setIsFinalDecision(!isFinalDecision);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.body}>
        <CardContent className={classes.explanation}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Đơn phúc khảo điểm
          </Typography>

          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Học sinh:
                </TableCell>
                <TableCell>{fetchData?.gradeDetail?.studentId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Điểm thành phần:
                </TableCell>
                <TableCell>{fetchData?.gradeComposition?.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Điểm hiện tại:
                </TableCell>
                <TableCell>{fetchData?.gradeDetail?.grade}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Điểm mong muốn:
                </TableCell>
                <TableCell>{fetchData?.studentExpectation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Lý do:
                </TableCell>
                <TableCell>
                  <Typography>{fetchData?.studentExplanation}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {!fetchData?.gradeDetail?.studentId === user.studentId && (
            <>
              <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
                Nhập phúc khảo
              </Typography>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Nhập bình luận:
                    </TableCell>
                    <TableCell>
                      <TextField
                        inputRef={commentRef}
                        multiline
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <FormGroup sx={{ "& span": { fontSize: "0.875rem" } }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              checked={isFinalDecision}
                              onChange={handleCheckIsFinalDecision}
                            />
                          }
                          label="Quyết định cuối cùng"
                        />
                      </FormGroup>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                  {isFinalDecision && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <FormGroup sx={{ "& span": { fontSize: "0.875rem" } }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked
                                checked={isKeepGrade}
                                onChange={handleCheckKeepGrade}
                              />
                            }
                            label="Giữ nguyên điểm"
                          />
                        </FormGroup>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  )}

                  {!isKeepGrade && isFinalDecision && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Nhập điểm:
                      </TableCell>
                      <TableCell>
                        <TextField inputRef={gradeRef} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
        {!fetchData?.gradeDetail?.studentId === user.studentId && (
          <CardActions className={classes.actions}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="success"
              sx={{ mr: 4, mb: 2 }}
            >
              Gửi
            </Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default GradeReviewDetail;
