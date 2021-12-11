import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import stringToColor from '../../../helpers/stringToColor';

const useStyles = makeStyles({
  partTitle: {
    color: 'grey',

    margin: '10px',
  },
});

export default function HeaderDrawerSecondPart() {
  const classes = useStyles();

  const classroomsRedux = useSelector((state) => state.classrooms);
  console.log(
    '🚀 ~ file: index.jsx ~ line 21 ~ HeaderDrawerSecondPart ~ classroomsRedux',
    classroomsRedux
  );
  const userRedux = useSelector((state) => state.user.user);
  console.log(
    '🚀 ~ file: index.jsx ~ line 22 ~ HeaderDrawerSecondPart ~ userRedux',
    userRedux
  );

  const renderOwnedClassrooms = () => {
    return classroomsRedux?.classrooms?.map((classroom) => {
      if (classroom.owner._id === userRedux._id) {
        return (
          <ListItem
            button
            component={Link}
            to={`/classrooms/${classroom._id}`}
            key={classroom._id}
          >
            <ListItemIcon>
              <Avatar sx={{ bgcolor: stringToColor(classroom.title) }}>
                {classroom.title[0].toUpperCase()}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={classroom.title} />
          </ListItem>
        );
      }
      return null;
    });
  };

  const renderParticipatedClassrooms = () => {
    return classroomsRedux?.classrooms?.map((classroom) => {
      if (classroom.owner._id !== userRedux._id) {
        return (
          <ListItem
            button
            component={Link}
            to={`/classrooms/${classroom._id}`}
            key={classroom._id}
          >
            <ListItemIcon>
              <Avatar sx={{ bgcolor: stringToColor(classroom.title) }}>
                {classroom.title[0].toUpperCase()}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={classroom.title} />
          </ListItem>
        );
      }
      return null;
    });
  };

  return (
    <>
      <div className={classes.partTitle}>Đã tham gia</div>
      {renderParticipatedClassrooms()}
      <Divider />
      <div className={classes.partTitle}>Lớp của bạn</div>
      {renderOwnedClassrooms()}
    </>
  );
}
