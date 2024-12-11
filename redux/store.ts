import { configureStore } from "@reduxjs/toolkit";
import complaintReducer from "./reducers/complaintReducer";
import informationReducer from "./reducers/informationReducer";
import interestReducer from "./reducers/interestReducer";
import noteReducer from "./reducers/noteReducer";
import userReducer from "./reducers/userReducer";
import victimReducer from "./reducers/victimReducer";

export const store = configureStore({
  reducer: {
    complaint: complaintReducer,
    information: informationReducer,
    interestReducer: interestReducer,
    note: noteReducer,
    user: userReducer,
    victimReducer: victimReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
