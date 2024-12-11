import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Note, NoteResponse, NoteState } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uri } from "@/utils/uri";

// create note
export const createNotes = createAsyncThunk<
  NoteResponse,
  { id: number; data: Note }
>("note/create", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${uri}/api/v4/notes/create/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

// get note by id
export const getNoteById = createAsyncThunk<NoteResponse, { id: number }>(
  "note/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v4/notes/read/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// delete note by id
export const deleteNoteById = createAsyncThunk<NoteResponse, { id: number }>(
  "note/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(`${uri}/api/v4/notes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create note
      .addCase(createNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.data.note || [];
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // get note by id
      .addCase(getNoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.data.note || [];
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // delete note by id
      .addCase(deleteNoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.data.note || [];
      })
      .addCase(deleteNoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default noteSlice.reducer;
