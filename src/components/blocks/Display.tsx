import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Word } from '../../features/words/wordsSlice';

export function Display() {    
  const dispatch = useDispatch<AppDispatch>();
  const display: Word | undefined = useSelector((state: RootState) => state.words.display)
  return (
    <div className="flex bg-white w-full h-[calc(100vh-235px)] items-center justify-center">
      {display?.text}      
    </div>           
  )
}