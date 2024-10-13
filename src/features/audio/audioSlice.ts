import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store/store";

export interface AudioState {
  currentTime: number;
  selection: [number, number]
}

const initialState: AudioState = {
  currentTime: 0,
  selection: [0, 0]
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {    
    setCurrentTime: (state: AudioState, action: PayloadAction<number>) => {      
      state.currentTime = action.payload;
    },
    setSelection: (state: AudioState, action: PayloadAction<[number, number]>) => {
      state.selection = action.payload;
    },
  },
});

export const { setCurrentTime, setSelection } = audioSlice.actions;

export default audioSlice.reducer;
