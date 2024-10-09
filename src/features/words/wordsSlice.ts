import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store/store";

export interface WordGroup {
  text: string,
  start: number,
  end: number
}

export interface WordState {
  words:WordGroup[]
  display: string;
  selected: WordGroup[];
  output: WordGroup[]; 
}

const initialState: WordState = {
  words:[],
  display: '',
  selected: [],
  output: []
};

export const wordsSlice = createSlice({
  name: "word",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {    
    setWords: (state: WordState, action: PayloadAction<WordGroup[]>) => {      
      state.words = action.payload;
    },
    displayWord: (state: WordState, action: PayloadAction<string>) => {      
      state.display = action.payload;
    },
    selectWord: (state: WordState, action: PayloadAction<WordGroup>) => {
      state.selected = action.payload;  
      state.display = action.payload.map((word: WordGroup) => word.text).join(' ');
    },
  },
});

export const { displayWord, selectWord, setWords } = wordsSlice.actions;

export default wordsSlice.reducer;
