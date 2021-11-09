import React from "react";
import News from "./news";
import Participants from "./participants";
import TabPanel from "./tab-panel";
import {
  fetchAClassroom,
  closeClassroom,
} from "../../redux/classroom/classroom.actions";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { connect } from "react-redux";

const Classroom = ({ activeTab, fetchAClassroom, closeClassroom }) => {
  console.log(activeTab);
  useEffect(() => {
    fetchAClassroom();

    return () => {
      closeClassroom();
    };
  }, [closeClassroom, fetchAClassroom]);

  return (
    <Box>
      <TabPanel value={activeTab} index={0}>
        <News />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Participants />
      </TabPanel>
    </Box>
  );
};

const mapDispatch = (dispatch) => ({
  fetchAClassroom: () => dispatch(fetchAClassroom()),
  closeClassroom: () => dispatch(closeClassroom()),
});

export default connect(null, mapDispatch)(Classroom);
