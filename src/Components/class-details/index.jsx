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
import { selectAClassroom } from "../../redux/classroom/classroom.selector";
import { useParams } from "react-router";

const Classroom = ({
  activeTab,
  fetchAClassroom,
  closeClassroom,
  classroom,
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchAClassroom(id);

    return () => {
      closeClassroom();
    };
  }, [closeClassroom, fetchAClassroom, id]);

  return (
    <Box>
      <TabPanel value={activeTab} index={0}>
        <News classroom={classroom} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Participants classroom={classroom} />
      </TabPanel>
    </Box>
  );
};

const mapDispatch = (dispatch) => ({
  fetchAClassroom: (index) => dispatch(fetchAClassroom(index)),
  closeClassroom: () => dispatch(closeClassroom()),
});

const mapState = createStructuredSelector({
  classroom: selectAClassroom,
});

export default connect(mapState, mapDispatch)(Classroom);
