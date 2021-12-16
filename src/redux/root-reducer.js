import userReducer from "./user/user.reducer";
import classroomsReducer from "./classrooms/classrooms.reducer";
import classroomReducer from "./classroom/classroom.reducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["classroom"],
// };

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "token"],
};

const classroomsPersistConfig = {
  key: "classrooms",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  classrooms: persistReducer(classroomsPersistConfig, classroomsReducer),
  classroom: classroomReducer,
});

export default rootReducer;
