import { createAsyncThunk, createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store/store";

export interface Frase {
  ids: string[],
  text: string,  
  start: number,
  end: number
}

export interface Word {
  id: string,
  text: string,
  start: number,
  end: number
}

export interface WordState {
  words:Word[]
  display: Word | undefined;  
  selectedIdx: string[];
  frases: Frase[]; 
}

const initialState: WordState = {
  words:[],  
  display: undefined,  
  selectedIdx: [],
  frases: []
};

export const wordsSlice = createSlice({
  name: "word",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {    
    // Initial Set-up
    setWords: (state: WordState, action: PayloadAction<Word[]>) => {   
      state.words = action.payload;
      // Build frases
      state.frases = action.payload.map((word: Word) => ({ids: [word.id], text: word.text, start: word.start, end: word.end}))      
    },
    editWord: (state: WordState, action: PayloadAction<Word>) => {
      const idx = state.words.findIndex((word:Word) => word.id === action.payload.id)      
      state.words[idx] = action.payload;      
    },
    displayWord: (state: WordState, action: PayloadAction<Word | undefined>) => {      
      state.display = action.payload;
    },    
    selectFraseIds: (state: WordState, action: PayloadAction<string[]>) => {        
      state.selectedIdx = action.payload;      
    },
    createFrase: (state: WordState, action: PayloadAction<string[]>) => {
      const frases = current(state).frases
      const words = current(state).words.filter((word:Word) => action.payload.includes(word.id))      
      // Find Indexes
      const idx = action.payload.map((id: string) => frases.findIndex((frase: Frase) => frase.ids.includes(id)))      
      // Take upper/lower index
      const min = Math.min(...idx)
      const max = Math.max(...idx)               
      // Replace min index with new joined array
      state.frases[min].ids = action.payload
      state.frases[min].text = words.map((word:Word) => word.text).join(' ')
      state.frases[min].start = Math.min(...words.map((word:Word) => word.start))
      state.frases[min].end = Math.max(...words.map((word:Word) => word.end))
      // Remove lastindex
      state.frases.splice(max, 1);
    },
  },
});

export const { displayWord, setWords, editWord, createFrase, selectFraseIds } = wordsSlice.actions;

export default wordsSlice.reducer;
