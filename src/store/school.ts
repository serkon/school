// school.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/components/axios/axios.component";
import { School } from "./dto";

export interface State {
  data: School[];
  status: "idle" | "loading" | "failed";
  error: any;
}

export enum SCHOOL_DISPATCH_PROPS {
  GET_PAGED_LIST= 'GET_PAGED_LIST'
}

const API_URL = process.env.REACT_APP_LOCAL_URL;

const initialState: State = {
    data: [],
    status: "idle",
    error: null
};

export const getPagedList = createAsyncThunk(
  'GET_PAGED_LIST',
  async ({ page=1, size=10 }: { page: number; size: number }, thunkAPI) => {
    try {
      // const response = await api.post(`${API_URL}/Schools/getPagedList?PageNumber=1&PageSize=12`, {
      //   "allRecords": true,
      //   "recordStatus": true,
      //   "institutionId": 0,
      //   "cityId": 0,
      //   "countyId": 0
      // });
      const response = await api.get(`${API_URL}/Schools/getPagedList?PageNumber=1&PageSize=12`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const schoolSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPagedList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPagedList.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getPagedList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as any).message;
      });
  }
});


export default schoolSlice.reducer;
