import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

// Audio Player
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { AudioVisualizer } from 'react-audio-visualize';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useRef, useState } from 'react';
// import { setCurrentTime, setDuration, setSelection } from '../../features/audio/audioSlice';
import { msToSec } from '../../utils/time';
import { Word } from '../../features/words/wordsSlice';
import { borders, colors, tagColors } from '../../utils/css';

const AUDIO_URL = '/basic_es.wav';
const WAVE_HEIGHT = 95;

export function Player() {

  const dispatch = useDispatch<AppDispatch>();
  const selection = useSelector((state: RootState) => state.audio.selection)
  const selectedWords: Word[] = useSelector((state: RootState) => state.words.selected)  

  const [head, setHead] = useState<number>(0); // Player head
  const [marks, setMarks] = useState<[number, number][]>([]); // Selected Words
  const [duration, setDuration] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [blob, setBlob] = useState<Blob>();
  const visualizerRef = useRef<HTMLCanvasElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audioContext = new AudioContext();    
    setWidth(window.innerWidth)    
    const fetchData = async () => {      
      const blob = await fetch(AUDIO_URL).then(r => r.blob());      
      const arrayBuffer = await blob.arrayBuffer()
      setBlob(blob)      
      audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {        
        setDuration(audioBuffer.duration)
        // dispatch(setDuration(audioBuffer.duration))  
        console.log("Setting Listeners")
        document.addEventListener("time", ((e) => onTime(e, audioBuffer.duration, window.innerWidth)) as EventListener);
      })

    }    
    fetchData().catch(console.error);
    return () => {
      document.removeEventListener("time", onTime as EventListener);
    }
  }, [])

  useEffect(() => {    
    const min = selectedWords.reduce((min: number, p:Word) => p.start < min ? p.start : min, 9999);
    const max = selectedWords.reduce((max: number, p:Word) => p.end > max ? p.end : max, 0);    
    const marks:[number, number][] = [];
    for (const word of selectedWords) {
      const x1 = (width * word.start) / duration;
      const x2 = (width * word.end) / duration;      
      marks.push([x1,x2]);
    }
    setMarks(marks);    
  }, [selectedWords])

  const onPlay = (e: any) =>{    
    const playingEvt = new CustomEvent("playing", { detail: { time: e.target?.currentTime }});
    document.dispatchEvent(playingEvt);
  }
  const onPause = (e: any) =>{ 
    const time = e.target?.currentTime;
    if(!time) return
    const pauseEvt = new CustomEvent("pause", { detail: { time }});
    const head = (width * time) / (duration * 100);
    setHead(head);
    document.dispatchEvent(pauseEvt);
  }  
  const onSeeked = (e: any) =>{    
    const time = e.target?.currentTime;
    if(!time) return
    const seekedEvt = new CustomEvent("seeked", { detail: { time }});    
    const head = (width * time) / (duration * 100);
    setHead(head);
    document.dispatchEvent(seekedEvt);
  }
  const onSeeking = (e: any) =>{    
    const time = e.target?.currentTime;
    if(!time) return
    const seekingEvt = new CustomEvent("seeking", { detail: { time }});
    const head = (width * time) / (duration * 100);
    setHead(head);
    document.dispatchEvent(seekingEvt);
  }

  const onTime = (e: any, _duration: number, _width: number) =>{    
    const time = e.detail.time;    
    const head = (_width * time) / (_duration * 100);
    setHead(head);    
  }  

  return (
    <div>
      <AudioPlayer
        src={AUDIO_URL}
        volume={0.5}
        showJumpControls={false}      
        listenInterval= {5}
        progressUpdateInterval={10}      
        onPause={onPause}
        onPlay={onPlay}      
        onSeeked={onSeeked}
        onSeeking={onSeeking}
        layout="horizontal"
        customControlsSection={
          [              
            <div className="flex flex-growth"></div>,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]
        }
        />    
        {blob && (
          <div className='relative'>
            <div className='absolute h-[120px] w-full inset-0'>
              {marks.map((mark:[number,number], i: number) => 
              <div
                key={i}
                style={{
                  left: mark[0], 
                  width: mark[1] - mark[0], 
                  background: tagColors[i].background, 
                  borderColor:tagColors[i].border
                }} 
                className='absolute h-[120px] w-[40px] inset-y-0 opacity-50 border-x border-y-0'>
              </div>)
              }
              <div className='absolute h-[120px] w-[1px] bg-red-500' style={{left: head}} />        
            </div>
            <AudioVisualizer
              ref={visualizerRef}
              blob={blob}
              width={width}
              height={120}
              barWidth={1}
              gap={1}
              barColor={'#000'}
              backgroundColor={'#f5f5f5'}       
            />
          </div>
      )}
    </div>      
  )
}