import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Frase, Word, createFrase } from '../../features/words/wordsSlice';
import { WordEditor } from './WordEdit';
import { tagColors } from '../../utils/css';
import Button from 'antd/es/button';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

export function Editor() {    
  const dispatch = useDispatch<AppDispatch>();
  const words: Word[] = useSelector((state: RootState) => state.words.words)
  const frases: Frase[] = useSelector((state: RootState) => state.words.frases)
  const wordsIdx: string[] = useSelector((state: RootState) => state.words.selectedIdx)

  const [selWords, setSelWords] = useState<Word[]>([])

  const onJoinWords = (w1: string, w2: string) => {    
    dispatch(createFrase([w1, w2]))
  }

  useEffect(() => {
    const _words = words.filter((word: Word) => wordsIdx.includes(word.id))
    setSelWords(_words);
  }, [wordsIdx])

  return (
    <div className="w-full pt-2">
      <div>        
      </div>      
      {selWords.map((word: Word, i: number) => (
        <div className='' key={i}>
          <WordEditor key={i} word={word} color={tagColors[i]}/>
          {i < selWords.length - 1 ? <div className="w-full text-center"><Button onClick={() => onJoinWords(selWords[i].id, selWords[i+1].id)} size={'small'} icon={<ColumnHeightOutlined />} /></div> : null}
        </div>
      ))}
    </div>
  )
}