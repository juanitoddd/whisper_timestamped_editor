import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Word, createFrase } from '../../features/words/wordsSlice';
import { WordEditor } from './WordEdit';
import { tagColors } from '../../utils/css';
import Button from 'antd/es/button';
import { ColumnHeightOutlined } from '@ant-design/icons';

export function Editor() {    
  const dispatch = useDispatch<AppDispatch>();
  const words: Word[] = useSelector((state: RootState) => state.words.words)
  const selected: Word[] = useSelector((state: RootState) => state.words.selected)    

  const onJoinWords = (w1: string, w2: string) => {
    console.log("[w1-w2]", w1, w2)
    dispatch(createFrase([w1, w2]))
  }

  return (
    <div className="w-full pt-2">
      {selected.map((word: Word, i: number) => (
        <div className='' key={i}>
          <WordEditor key={i} word={word} color={tagColors[i]}/>
          {i < selected.length - 1 ? <div className="w-full text-center"><Button onClick={() => onJoinWords(selected[i].id, selected[i+1].id)} size={'small'} icon={<ColumnHeightOutlined />} /></div> : null}
        </div>
      ))}
    </div>
  )
}