import React from "react";
import News from "./news";
import Participants from "./participants";
import TabPanel from "../../utils/tab-panel";
import {
  fetchAClassroom,
  closeClassroom,
} from "../../redux/classroom/classroom.actions";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useParams } from "react-router";
import WithSpinner from "../with-spinner";
import { useSelector, useDispatch } from "react-redux";

const Classroom = ({ activeTab }) => {
  const { id } = useParams();
  const user = useSelector(({ user }) => user.user);
  const token = useSelector(({ user }) => user.token);
  const participants = useSelector(({ classroom }) => classroom.participants);
  const classroom = useSelector(({ classroom }) => classroom.classroom);
  const dispatch = useDispatch();
  useEffect(() => {
    const dispatchFetchAClassroom = (id) => dispatch(fetchAClassroom(id));
    dispatchFetchAClassroom(id);

    return () => {
      const dispatchCloseClassroom = () => dispatch(closeClassroom());
      dispatchCloseClassroom();
    };
  }, [dispatch, id]);

  if (classroom === null) return null;
  let isTeacher = user._id === classroom.owner._id;

  participants.forEach((p) => {
    if (p._id === user._id && p.role === "teacher") isTeacher = true;
  });

  return (
    <Box>
      <TabPanel value={activeTab} index={0}>
        <News classroom={classroom} isTeacher={isTeacher} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Participants
          participants={participants}
          owner={classroom.owner}
          user={user}
          invitationCode={classroom.invitationCode}
          classroomId={classroom._id}
          token={token}
        />
      </TabPanel>
    </Box>
  );
};

export default WithSpinner(Classroom);
