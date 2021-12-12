import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAClassroom,
  closeClassroom,
} from "../../redux/classroom/classroom.actions";
import WithSpinner from "../with-spinner";
import ClassDetails from "./class-details";
import GradeStructure from "./class-grade-structure";

const ClassroomLayout = ({ activeTab, handleChangeTab }) => {
  const { id } = useParams();
  const user = useSelector(({ user }) => user.user);
  const token = useSelector(({ user }) => user.token);
  const participants = useSelector(({ classroom }) => classroom.participants);
  const classroom = useSelector(({ classroom }) => classroom.classroom);
  const gradeStructure = useSelector(
    ({ classroom }) => classroom.classroom?.gradeStructure
  );
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchFetchAClassroom = (id) => dispatch(fetchAClassroom(id));
    dispatchFetchAClassroom(id);
    return () => {
      const dispatchCloseClassroom = () => dispatch(closeClassroom());
      dispatchCloseClassroom();
      handleChangeTab(null, 0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (classroom === null) return null;
  let isTeacher = user._id === classroom.owner._id;

  participants.forEach((p) => {
    if (p._id === user._id && p.role === "teacher") isTeacher = true;
  });
  return (
    <Switch>
      <Route
        path={`${match.url}/grade-structure`}
        render={() =>
          isTeacher ? (
            <GradeStructure gradeStructure={gradeStructure} />
          ) : (
            <Redirect to={match.url} />
          )
        }
      />
      <Route
        path={match.url}
        exact
        render={() => (
          <ClassDetails
            activeTab={activeTab}
            user={user}
            token={token}
            isTeacher={isTeacher}
            classroom={classroom}
            participants={participants}
          />
        )}
      />
    </Switch>
  );
};

export default WithSpinner(ClassroomLayout);
