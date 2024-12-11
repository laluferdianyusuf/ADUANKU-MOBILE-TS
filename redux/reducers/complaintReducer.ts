import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Complaint, ComplaintResponse, ComplaintState } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uri } from "@/utils/uri";

// create complaint
export const createComplaint = createAsyncThunk<
  ComplaintResponse,
  { id: number; data: Complaint }
>("create/complaint", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${uri}/api/v2/complaint/create/${id}`,
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

// update to process
export const updateComplaintToProcess = createAsyncThunk<
  ComplaintResponse,
  { id: number }
>("update/complaint-process", async ({ id }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      `${uri}/api/v2/complaint/update/process/${id}`,
      {},
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

// update to done
export const updateComplaintToDone = createAsyncThunk<
  ComplaintResponse,
  { id: number }
>("update/complaint-done", async ({ id }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      `${uri}/api/v2/complaint/update/done/${id}`,
      {},
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

// get all complaints
export const getAllComplaints = createAsyncThunk<
  ComplaintResponse,
  { id: number }
>("get/all-complaints", async ({ id }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${uri}/api/v2/complaints/by/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

// get all complaints by admin
export const getAllComplaintsByAdmin = createAsyncThunk<
  ComplaintResponse,
  void
>("get/all-complaints/by-admin", async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${uri}/api/v2/complaints/by-admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

// get all complaints is processing
export const getComplaintIsProcessing = createAsyncThunk<
  ComplaintResponse,
  { id: number }
>("get/complaints-isProcessing", async ({ id }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${uri}/api/v2/complaints/waiting/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

// get all complaints is progress
export const getComplaintIsProgress = createAsyncThunk<
  ComplaintResponse,
  { id: number }
>("get/complaints-isProgress", async ({ id }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${uri}/api/v2/complaints/process/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

// get all complaints is done
export const getComplaintIsDone = createAsyncThunk<
  ComplaintResponse,
  { id: number }
>("get/complaints-isDone", async ({ id }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${uri}/api/v2/complaints/done/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

// get all complaints by violence
export const getComplaintViolence = createAsyncThunk<
  ComplaintResponse,
  Complaint
>("get/complaints-violence", async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${uri}/api/v2/complaints/violence`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

// get all complaints by id
export const getComplaintId = createAsyncThunk<Complaint, { id: number }>(
  "get/complaints-id",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v2/complaint/by/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data.complaint;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// open complaint
export const isOpened = createAsyncThunk<ComplaintResponse, { id: number }>(
  "open/complaint",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${uri}/api/v2/complaint/opened/${id}`,
        {},
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
  }
);

// delete complaint
export const deleteComplaint = createAsyncThunk<
  ComplaintResponse,
  { id: number }
>("delete/complaints-id", async ({ id }, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(
      `${uri}/api/v2/complaint/delete/${id}`,
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

const initialState: ComplaintState = {
  complaints: [],
  loading: false,
  error: null,
};

const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create complaint
      .addCase(createComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(createComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   update complaint process
      .addCase(updateComplaintToProcess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComplaintToProcess.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(updateComplaintToProcess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   update complaint done
      .addCase(updateComplaintToDone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComplaintToDone.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(updateComplaintToDone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   get all complaints
      .addCase(getAllComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(getAllComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   get complaints is waiting
      .addCase(getComplaintIsProcessing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintIsProcessing.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(getComplaintIsProcessing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   get complaints is process
      .addCase(getComplaintIsProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintIsProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(getComplaintIsProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   get complaints is done
      .addCase(getComplaintIsDone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintIsDone.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(getComplaintIsDone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   get complaints violence
      .addCase(getComplaintViolence.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintViolence.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(getComplaintViolence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   get complaints by id
      .addCase(getComplaintId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComplaintId.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = [action.payload];
      })
      .addCase(getComplaintId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   opened complaint
      .addCase(isOpened.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(isOpened.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(isOpened.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //   delete complaint
      .addCase(deleteComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data.complaint || [];
      })
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default complaintSlice.reducer;
