import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Victim, VictimResponse, VictimState } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uri } from "@/utils/uri";

export const getVictimCount = createAsyncThunk<VictimResponse, void>(
  "victim/count",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v3/victims/count`, {
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

const initialState: VictimState = {
  victims: null,
  loading: false,
  error: null,
};

const victimSlice = createSlice({
  name: "victim",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get victim count
      .addCase(getVictimCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVictimCount.fulfilled, (state, action) => {
        state.loading = false;
        state.victims = action.payload.data.victim;
      })
      .addCase(getVictimCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default victimSlice.reducer;
