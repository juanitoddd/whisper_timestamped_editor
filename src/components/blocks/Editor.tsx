import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Word } from '../../features/words/wordsSlice';
import { WordEditor } from './WordEdit';
import { tagColors } from '../../utils/css';

export function Editor() {    
  const dispatch = useDispatch<AppDispatch>();
  const words: Word[] = useSelector((state: RootState) => state.words.words)
  const selected: Word[] = useSelector((state: RootState) => state.words.selected)  
  return (
    <div className="w-full">
      {selected.map((word: Word, i: number) => <WordEditor key={i} word={word} color={tagColors[i]}/>)}
    </div>           
  )
}