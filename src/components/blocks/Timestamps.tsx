import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Checkbox } from "antd";
import type { CheckboxProps } from 'antd';
import { useEffect, useState } from 'react';
import { classNames } from '../../utils/css';
import { displayWord, Word, Frase, selectFraseIds } from '../../features/words/wordsSlice';
import { msToSec, secToMs } from '../../utils/time';

function compare(a:Word, b:Word) {
  if (a.start < b.start) return -1;
  if (a.start > b.start) return 1;
  return 0;
}

export function Timestamps() {

  const dispatch = useDispatch<AppDispatch>();  
  const words = useSelector((state: RootState) => state.words.words)
  const frases = useSelector((state: RootState) => state.words.frases)
  const selectedIdx: string[] = useSelector((state: RootState) => state.words.selectedIdx)

  const cursor: number = useSelector((state: RootState) => state.audio.currentTime)
  
  const [selIdx, setSelIdx] = useState<string[]>([]);

  const [current, setCurrent] = useState<Word | undefined>();
  const [start, setStart] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [state, setState] = useState<string>('idle');
  
  useEffect(() => {     
    setTime(cursor * 100)
  }, [cursor])
  
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
    setState('idle')
  } 

  const onSeeking = (e: CustomEvent) => {
    // console.log("onSeeking", e.detail.time)
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
    document.addEventListener("seeking", onSeeking as EventListener);
    return () => {
      document.removeEventListener("playing", onPlaying as EventListener);
      document.removeEventListener("pause", onPause as EventListener);      
      document.removeEventListener("seeked", onSeeked as EventListener);
      document.removeEventListener("seeking", onSeeking as EventListener);
    };
  }, [words]);

  const isSounding = (frase: Frase) => {
    const secs = msToSec(time);
    return secs > frase.start && secs < frase.end
  }

  const onSelect = (frase: Frase) => {
    let _sel = [...selIdx]     
    for(const id of frase.ids) {
      if(_sel.includes(id)) _sel = _sel.filter((_id: string) => _id !== id);
      else _sel.push(id) 
    }    
    setSelIdx(_sel);
    dispatch(selectFraseIds(_sel))
  }

  const isChecked = (frase: Frase): boolean => {    
    let _checked = true
    for(const id of frase.ids) if(!selectedIdx.includes(id)) _checked = false
    return _checked
  }
   
  return (
    <div>      
      <div className="border-b p-1">Timestamps {msToSec(time)}</div>
      <div className='flex'>
        <div className='min-w-[50px]'>
          
        </div>
        <div className="w-[230px] pt-1">
          {/*words.map((word: Word, i: number) => (
            <div
              className={classNames({              
                'flex border-b': true,
                'border-slate-800 font-bold': isSounding(word),
                'border-slate-300 font-normal': !isSounding(word)
                })}
                key={i}>
              <div><Checkbox onChange={() => onSelect(word)}><div className='w-[200px]'>{word.text}</div></Checkbox></div>            
            </div>
          ))*/}

          {frases.map((frase: Frase, i: number) => (
            <div
              className={classNames({              
                'flex border-b': true,
                'border-slate-800 font-bold': isSounding(frase),
                'border-slate-300 font-normal': !isSounding(frase)
                })}
                key={i}>
              <div><Checkbox checked={isChecked(frase)} onChange={() => onSelect(frase)}><div className='w-[200px]'>{frase.text}</div></Checkbox></div>            
            </div>
          ))}          
        </div>
      </div>
    </div>
  )
}