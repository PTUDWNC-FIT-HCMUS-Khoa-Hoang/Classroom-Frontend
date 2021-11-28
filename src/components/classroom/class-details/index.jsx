import React from "react";
import News from "./news";
import Participants from "./participants";
import TabPanel from "../../../utils/tab-panel";
import { Box } from "@mui/system";

const Classroom = ({
  activeTab,
  user,
  token,
  participants,
  classroom,
  isTeacher,
}) => {
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

export default Classroom;
