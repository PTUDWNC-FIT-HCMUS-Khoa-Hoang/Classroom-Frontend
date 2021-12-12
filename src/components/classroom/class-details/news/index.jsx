import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { useHistory, useLocation } from "react-router-dom";

const News = ({ classroom, isTeacher }) => {
  const history = useHistory();
  const location = useLocation();
  if (!classroom) return null;
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "75%" }}>
        <Card
          sx={{
            border: 1,
            height: "40vh",
            backgroundColor: "cornflowerblue",
            color: "white",
            borderRadius: 4,
          }}
        >
          <CardContent
            sx={{
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {classroom.title}
          </CardContent>
        </Card>
        <Box sx={{ display: "flex", mt: 2 }}>
          <Box sx={{ flex: 2, width: "100%", mr: 3 }}>
            {isTeacher && (
              <Card
                sx={{
                  border: 1,
                  borderRadius: 4,
                  mb: 2,
                  height: "100px",
                  flex: 1,
                  textAlign: "left",
                }}
              >
                <CardContent>
                  <Typography sx={{ fontWeight: "bold" }}>Mã lớp</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      mt: 1,
                      color: "cornflowerblue",
                    }}
                  >
                    {classroom.invitationCode}
                  </Typography>
                </CardContent>
              </Card>
            )}
            <Card
              sx={{
                border: 1,
                borderRadius: 4,
                height: "auto",
                flex: 1,
                textAlign: "left",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                    mt: 0,
                  }}
                >
                  <Typography
                    sx={{ margin: "auto", ml: 0, fontWeight: "bold" }}
                  >
                    Cấu trúc điểm
                  </Typography>
                  {isTeacher && (
                    <IconButton
                      onClick={() => {
                        history.push(location.pathname + "/grade-structure");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>
                {classroom.gradeStructure.map((item) => (
                  <Typography
                    variant="h5"
                    sx={{
                      color: "cornflowerblue",
                    }}
                  >
                    {item.title}: {item.grade}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Box>
          <Card
            sx={{
              border: 1,
              borderRadius: 4,
              flex: 5,
            }}
          >
            <CardContent
              sx={{
                textAlign: "left",
              }}
            >
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
              <p>Bảng tin 2</p>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default News;
