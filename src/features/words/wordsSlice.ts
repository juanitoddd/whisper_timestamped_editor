import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store/store";

export interface Word {
  id: string,
  text: string,
  start: number,
  end: number
}

export interface WordGroup {
  text: string,
  start: number,
  end: number
}

export interface WordState {
  words:Word[]
  display: Word | undefined;
  selected: Word[];
  output: WordGroup[]; 
}

const initialState: WordState = {
  words:[],  
  display: undefined,
  selected: [],
  output: []
};

export const wordsSlice = createSlice({
  name: "word",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {    
    setWords: (state: WordState, action: PayloadAction<Word[]>) => {      
      state.words = action.payload;
    },
    editWord: (state: WordState, action: PayloadAction<Word>) => {
      const idx = state.words.findIndex((word:Word) => word.id === action.payload.id)
      state.words[idx] = action.payload;
      const idx2 = state.selected.findIndex((word:Word) => word.id === action.payload.id)
      state.selected[idx2] = action.payload;
    },
    displayWord: (state: WordState, action: PayloadAction<Word>) => {      
      state.display = action.payload;
    },
    selectWord: (state: WordState, action: PayloadAction<Word[]>) => {        
      state.selected = action.payload;
      // state.display = action.payload.map((word: Word) => word.text).join(' ');
    },
  },
});

export const { displayWord, selectWord, setWords, editWord } = wordsSlice.actions;

export default wordsSlice.reducer;
