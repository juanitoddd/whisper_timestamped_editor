import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Checkbox } from "antd";
import type { CheckboxProps } from 'antd';
import timestamps from '../../../public/timestamps_es.json';
import { useEffect, useState } from 'react';
import { classNames } from '../../utils/css';

export function Timestamps() {

  const [words, setWords] = useState<any[]>([]);
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

  useEffect(() => {
    let words: any[] = [];
    const segs = timestamps.segments
    for(const seg of segs) { words = words.concat(seg.words)}    
    console.log("🚀 ~ words:", words)
    setWords(words)    
  }, []);

  // Chrono
  useEffect(() => {
    console.log("state ---->", state, start)
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
    return () => {
      document.removeEventListener("playing", onPlaying as EventListener);
      document.removeEventListener("pause", onPause as EventListener);
  };
  }, [words]);

  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const msToSec = (ms: number) => ((ms/100) % 60)

  const isSounding = (word: any) => {
    const secs = msToSec(time);
    return secs > word.start && secs < word.end
  }

  // const selected = useSelector((state: RootState) => state.ui.rightPanel);  
  return (
    <div>
      Timestamps {msToSec(time)}
      <div>
        {words.map((word: any, i: number) => (
          <div
            className={classNames({              
              'flex justify-between border-b': true,
              'bg-black': isSounding(word),
              'bg-white': !isSounding(word)
              })}
              key={i}>
            <div><Checkbox onChange={onChange}>{i} {word.text}</Checkbox></div>
            <div className="text-sm">{word.start} - {word.end}</div>
          </div>
        ))}
      </div>
    </div>
  )
}