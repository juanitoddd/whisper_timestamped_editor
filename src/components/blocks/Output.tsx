import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

export function Output() {    
  const dispatch = useDispatch<AppDispatch>();
  const words = useSelector((state: RootState) => state.words)
  return (
    <div className="flex bg-white w-full items-center justify-center">
      TODO://    
    </div>           
  )
}