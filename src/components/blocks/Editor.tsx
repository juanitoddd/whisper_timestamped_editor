import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

export function Editor() {    
  const dispatch = useDispatch<AppDispatch>();
  const words = useSelector((state: RootState) => state.words)
  return (
    <div className="flex bg-white w-full h-[calc(100vh-153px)] items-center justify-center">
      TODO:     
    </div>           
  )
}