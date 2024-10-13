import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Checkbox } from "antd";
import type { CheckboxProps } from 'antd';
import { useEffect, useState } from 'react';
import { classNames } from '../../utils/css';
import { displayWord, selectWord, Word, WordGroup } from '../../features/words/wordsSlice';
import { msToSec, secToMs } from '../../utils/time';

function compare(a:Word, b:Word) {
  if (a.start < b.start) return -1;
  if (a.start > b.start) return 1;
  return 0;
}

export function Timestamps() {

  const dispatch = useDispatch<AppDispatch>();
  const selectedWords = useSelector((state: RootState) => state.words.selected)  
  const words = useSelector((state: RootState) => state.words.words)
  
  const [current, setCurrent] = useState<Word | undefined>();
  const [start, setStart] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [state, setState] = useState<string>('idle');

  const onPlaying = (e: CustomEvent) => {
    // console.log("onPlaying", secToMs(e.detail.time))   
    setStart(secToMs(e.detail.time))
    setState('playing')        
  }  

  const onPause = (e: CustomEvent) => {    
    // console.log("onPause", secToMs(e.detail.time))
    setStart(secToMs(e.detail.time))
    setState('idle')      
  }  

  const onSeeked = (e: CustomEvent) => {
    // console.log("onSeeked", secToMs(e.detail.time))
    setStart(secToMs(e.detail.time))
    setStart(e.detail.time)
    setState('idle')
  } 

  // Time change
  useEffect(() => {    
    const secs = msToSec(time);
    const currentWord: Word | undefined =  words.find((word: Word) => secs > word.start && secs < word.end)
    const timeEvt = new CustomEvent("time", { detail: { time }});
    document.dispatchEvent(timeEvt);   
    setCurrent(currentWord)    
  }, [time]);

  // Show Display
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

  const isSounding = (word: Word) => {
    const secs = msToSec(time);
    return secs > word.start && secs < word.end
  }

  const onSelect = (word: Word) => {
    let selected = [...selectedWords]
    if(!selected.map((w: Word) => w.text).includes(word.text)) selected.push(word)
    else selected = selected.filter((w: Word) => w.text !== word.text)    
    selected.sort(compare);
    dispatch(selectWord(selected))
  }

  // const selected = useSelector((state: RootState) => state.ui.rightPanel);  
  return (
    <div>      
      <div className="border-b p-1">Timestamps {msToSec(time)}</div>
      <div className='flex'>
        <div className='min-w-[20px]'>
          
        </div>
        <div className="w-[270px] pt-1">
          {words.map((word: Word, i: number) => (
            <div
              className={classNames({              
                'flex border-b': true,
                'border-slate-800 font-bold': isSounding(word),
                'border-slate-300 font-normal': !isSounding(word)
                })}
                key={i}>
              <div><Checkbox onChange={() => onSelect(word)}><div className='w-[240px]'>{word.text}</div></Checkbox></div>            
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}