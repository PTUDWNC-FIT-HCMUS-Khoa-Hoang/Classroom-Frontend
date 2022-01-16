import React, { useState } from "react";
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
import Divider from "@mui/material/Divider";
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
});

const GradeReviewDetail = () => {
  const classes = useStyles();
  const [isKeepGrade, setIsKeepGrade] = useState(true);
  const handleCheckKeepGrade = () => {
    setIsKeepGrade(!isKeepGrade);
  };
  return (
    <div className={classes.root}>
      <Card className={classes.body}>
        <CardContent>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Đơn phúc khảo điểm
          </Typography>

          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Học sinh:
                </TableCell>
                <TableCell>18120388</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Điểm thành phần:
                </TableCell>
                <TableCell>Giữa kì</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Điểm hiện tại:
                </TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Điểm mong muốn:
                </TableCell>
                <TableCell>10</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Lý do:
                </TableCell>
                <TableCell>
                  <Typography>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
                  <TextField multiline sx={{ width: "100%" }} />
                </TableCell>
              </TableRow>
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
              {!isKeepGrade && (
                <TableRow>
                  <TableCell component="th" scope="row">
                    Nhập điểm:
                  </TableCell>
                  <TableCell>
                    <TextField />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button variant="contained" color="success" sx={{ mr: 4, mb: 2 }}>
            Gửi
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default GradeReviewDetail;
