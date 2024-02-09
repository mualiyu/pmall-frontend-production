import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  users: [],
  status: null,
};

export const userFetch = createAsyncThunk("users/usersFetch", async () => {
  const resp = await axios.get("endpointHere");
  return resp?.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [userFetch.pending]: (state, action) => {
      state.status = "Pending";
    },
    [userFetch.fulfilled]: (state, action) => {
      state.status = "Success";
      state.items = action.payload;
    },
    [userFetch.rejected]: (state, action) => {
      state.status = "Rejected";
    },
  },
});

export default userSlice.reducer;
