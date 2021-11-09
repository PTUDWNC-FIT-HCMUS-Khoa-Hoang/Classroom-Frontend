import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";

const News = () => {
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
            Bảng tin
          </CardContent>
        </Card>
        <Box sx={{ display: "flex", mt: 2, flexDirection: "flex-start" }}>
          <Card
            sx={{
              border: 1,
              borderRadius: 4,
              mr: 3,
              width: "30%",
              height: "200px",
              flex: 1,
            }}
          >
            <CardContent
              sx={{
                textAlign: "left",
              }}
            >
              Bảng tin 1
            </CardContent>
          </Card>
          <Card
            sx={{
              border: 1,
              borderRadius: 4,
              flex: 3,
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
