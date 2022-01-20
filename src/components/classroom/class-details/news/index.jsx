import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const News = ({ classroom, isTeacher }) => {
  const history = useHistory();
  const location = useLocation();

  const [gradeReviews, setGradeReviews] = useState([]);
  const [gradeDetails, setGradeDetails] = useState([]);
  const userRedux = useSelector((state) => state.user);

  useEffect(() => {
    const fetchGradeReviews = async () => {
      if (classroom) {
        console.log(
          '🚀 ~ file: index.jsx ~ line 23 ~ fetchGradeReviews ~ classroom',
          classroom
        );
        const { token } = userRedux;
        const axiosResult1 = await axios.get(
          `https://aw-midterm-server.herokuapp.com/grade-reviews/by-classroom-id/${classroom.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGradeReviews(axiosResult1.data);
        const axiosResult2 = await axios.get(
          `https://aw-midterm-server.herokuapp.com/grade-detail/${classroom.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGradeDetails(axiosResult2.data);
      }
    };

    fetchGradeReviews();
  }, [classroom, userRedux]);

  const renderGradeReviewList = () => {
    return gradeReviews.map((review) => {
      const gradeDetail = gradeDetails.find(
        (detail) => detail?._id === review?.gradeDetail
      );
      const gradeComposition = classroom?.gradeStructure?.find(
        (grade) => grade?._id === gradeDetail?.gradeId
      );
      return (
        <li>
          Yêu cầu phúc khảo từ sinh viên {gradeDetail?.studentId} tại cột điểm{' '}
          {gradeComposition?.title}.{' '}
          <span
            style={{
              textDecoration: 'underline',
              color: 'blue',
              cursor: 'pointer',
            }}
            onClick={() => history.push(`/grade-reviews/${review._id}`)}
          >
            Nhấn để xem
          </span>
        </li>
      );
    });
  };

  if (!classroom) return null;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '75%' }}>
        <Card
          sx={{
            border: 1,
            height: '40vh',
            backgroundColor: 'cornflowerblue',
            color: 'white',
            borderRadius: 4,
          }}
        >
          <CardContent
            sx={{
              fontSize: '40px',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            {classroom.title}
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Box sx={{ flex: 2, width: '100%', mr: 3 }}>
            {isTeacher && (
              <Card
                sx={{
                  border: 1,
                  borderRadius: 4,
                  mb: 2,
                  height: '100px',
                  flex: 1,
                  textAlign: 'left',
                }}
              >
                <CardContent>
                  <Typography sx={{ fontWeight: 'bold' }}>Mã lớp</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      mt: 1,
                      color: 'cornflowerblue',
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
                height: 'auto',
                flex: 1,
                textAlign: 'left',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                    mt: 0,
                  }}
                >
                  <Typography
                    sx={{ margin: 'auto', ml: 0, fontWeight: 'bold' }}
                  >
                    Cấu trúc điểm
                  </Typography>
                  {isTeacher && (
                    <IconButton
                      onClick={() => {
                        history.push(location.pathname + '/grade-structure');
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
                      color: 'cornflowerblue',
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
                textAlign: 'center',
              }}
            >
              <h4>Bảng tin</h4>
            </CardContent>
            <CardContent
              sx={{
                textAlign: 'center',
              }}
            >
              <ul>{renderGradeReviewList()}</ul>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default News;
