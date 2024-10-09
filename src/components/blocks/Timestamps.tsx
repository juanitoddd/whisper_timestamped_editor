import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Checkbox } from "antd";
import type { CheckboxProps } from 'antd';
import { useEffect, useState } from 'react';
import { classNames } from '../../utils/css';
import { displayWord, selectWord, WordGroup } from '../../features/words/wordsSlice';

export function Timestamps() {

  const dispatch = useDispatch<AppDispatch>();

  const selectedWords = useSelector((state: RootState) => state.words.selected)

  const words = useSelector((state: RootState) => state.words.words)  

  // const [words, setWords] = useState<WordGroup[]>([]);
  const [current, setCurrent] = useState<string>('');
  const [start, setStart] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [state, setState] = useState<string>('idle');

  const onPlaying = (e: CustomEvent) => {    
    setStart(e.detail.time)
    setState('playing')        
  }  

  const onPause = (e: CustomEvent) => {    
    setStart(e.detail.time)
    setState('idle')      
  }  

  const onSeeked = (e: CustomEvent) => {
    console.log("onSeeked", e.detail.time)
    // setTime(start); 
    setStart(e.detail.time)
    setState('idle')
  } 

  /*
  useEffect(() => {
    let words: WordGroup[] = [];
    const segs = timestamps.segments
    for(const seg of segs) { words = words.concat(seg.words)}    
    setWords(words)
  }, []);
  */
  
  useEffect(() => {    
    const secs = msToSec(time);
    const currentWord: WordGroup | undefined =  words.find((word: WordGroup) => secs > word.start && secs < word.end)     
    if(currentWord?.text) setCurrent(currentWord?.text)    
  }, [time]);

  useEffect(() => {        
    dispatch(displayWord(current))
  }, [current]);

  // Chrono
  useEffect(() => {    
    setTime(start);    
    const interval = setInterval(() => {
      if(state === 'playing') {        
        setTime(seconds => seconds + 1);        
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [state]);


  useEffect(() => {
    document.addEventListener("playing", onPlaying as EventListener);
    document.addEventListener("pause", onPause as EventListener);    
    document.addEventListener("seeked", onSeeked as EventListener);
    return () => {
      document.removeEventListener("playing", onPlaying as EventListener);
      document.removeEventListener("pause", onPause as EventListener);      
      document.removeEventListener("seeked", onSeeked as EventListener);
  };
  }, [words]);  

  const msToSec = (ms: number) => ((ms/100) % 60)

  const isSounding = (word: WordGroup) => {
    const secs = msToSec(time);
    return secs > word.start && secs < word.end
  }

  const onSelect = (word: WordGroup) => {
    let selected = [...selectedWords]
    if(!selected.map((w: WordGroup) => w.text).includes(word.text)) selected.push(word)
    else selected = selected.filter((w: WordGroup) => w.text !== word.text)    
    dispatch(selectWord(selected))
  }

  // const selected = useSelector((state: RootState) => state.ui.rightPanel);  
  return (
    <div>      
      <div className="border-b p-1">Timestamps {msToSec(time).toFixed(2)}</div>
      <div className="pt-1">
        {words.map((word: WordGroup, i: number) => (
          <div
            className={classNames({              
              'flex justify-between border-b': true,
              'border-slate-800 font-bold': isSounding(word),
              'border-slate-300 font-normal': !isSounding(word)
              })}
              key={i}>
            <div><Checkbox onChange={() => onSelect(word)}> {word.text}</Checkbox></div>
            <div className="text-sm pr-1">{word.start} - {word.end}</div>
          </div>
        ))}
      </div>
    </div>
  )
}