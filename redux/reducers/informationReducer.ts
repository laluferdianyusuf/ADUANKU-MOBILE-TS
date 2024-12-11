import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Information,
  InformationResponse,
  InformationState,
} from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uri } from "@/utils/uri";

// create information
export const createInformation = createAsyncThunk<
  InformationResponse,
  { data: Information }
>("information/create", async ({ data }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${uri}/api/v6/information/create`,
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

// delete note by id
export const deleteInformationById = createAsyncThunk<
  InformationResponse,
  { id: number }
>("information/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(
      `${uri}/api/v5/information/delete/${id}`,
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

// get all information
export const getInformation = createAsyncThunk<InformationResponse, void>(
  "information/read",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${uri}/api/v5/information/read`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// get all information
export const getInformationById = createAsyncThunk<Information, { id: number }>(
  "information/get/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${uri}/api/v5/information/get/${id}`);
      return response.data.data.information;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState: InformationState = {
  information: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create information
      .addCase(createInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.information = action.payload.data.information || [];
      })
      .addCase(createInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // delete information by id
      .addCase(deleteInformationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInformationById.fulfilled, (state, action) => {
        state.loading = false;
        state.information = action.payload.data.information || [];
      })
      .addCase(deleteInformationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // get information
      .addCase(getInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.information = action.payload.data.information || [];
      })
      .addCase(getInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // get information by id
      .addCase(getInformationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInformationById.fulfilled, (state, action) => {
        state.loading = false;
        state.information = [action.payload];
      })
      .addCase(getInformationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default noteSlice.reducer;
