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
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAClassroom,
  selectParticipants,
} from "../../redux/classroom/classroom.selector";
import { useParams } from "react-router";
import WithSpinner from "../with-spinner";
import { selectUser, selectToken } from "../../redux/user/user.selector";

const Classroom = ({
  activeTab,
  fetchAClassroom,
  closeClassroom,
  classroom,
  participants,
  user,
  token,
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchAClassroom(id);

    return () => {
      closeClassroom();
    };
  }, [closeClassroom, fetchAClassroom, id]);

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

const mapDispatch = (dispatch) => ({
  fetchAClassroom: (id) => dispatch(fetchAClassroom(id)),
  closeClassroom: () => dispatch(closeClassroom()),
});

const mapState = createStructuredSelector({
  classroom: selectAClassroom,
  participants: selectParticipants,
  user: selectUser,
  token: selectToken,
});

export default connect(mapState, mapDispatch)(WithSpinner(Classroom));
