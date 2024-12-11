import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Interest, InterestResponse, InterestState } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uri } from "@/utils/uri";

// create interest
export const createInterest = createAsyncThunk<
  InterestResponse,
  { id: number; data: Interest }
>("interest/create", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${uri}/api/v5/interest/create/${id}`,
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

// get all interest
export const getAllInterest = createAsyncThunk<InterestResponse, void>(
  "interest/get-all",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v5/interest/read`, {
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

// get interest by id
export const getInterestById = createAsyncThunk<Interest, { id: number }>(
  "interest/id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v5/interest/read//${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.interest;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState: InterestState = {
  interests: [],
  loading: false,
  error: null,
};

const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create Interest
      .addCase(createInterest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInterest.fulfilled, (state, action) => {
        state.loading = false;
        state.interests = action.payload.data.interest || [];
      })
      .addCase(createInterest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // get Interest by id
      .addCase(getInterestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInterestById.fulfilled, (state, action) => {
        state.loading = false;
        state.interests = [action.payload];
      })
      .addCase(getInterestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // get interests
      .addCase(getAllInterest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInterest.fulfilled, (state, action) => {
        state.loading = false;
        state.interests = action.payload.data.interest || [];
      })
      .addCase(getAllInterest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default interestSlice.reducer;
