import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

// Audio Player
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { AudioVisualizer } from 'react-audio-visualize';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useRef, useState } from 'react';
import { setCurrentTime, setSelection } from '../../features/audio/audioSlice';
import { msToSec } from '../../utils/time';
import { Word } from '../../features/words/wordsSlice';

const AUDIO_URL = '/basic_es.wav';

export function Player() {

  const selection = useSelector((state: RootState) => state.audio.selection)
  const selectedWords = useSelector((state: RootState) => state.words.selected)

  const [width, setWidth] = useState<number>(0);
  const [blob, setBlob] = useState<Blob>();
  const visualizerRef = useRef<HTMLCanvasElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener("time", onTime as EventListener);
    setWidth(window.innerWidth)    
    const fetchData = async () => {      
      const blob = await fetch(AUDIO_URL).then(r => r.blob());      
      setBlob(blob)
    }    
    fetchData().catch(console.error);
    return () => {
      document.removeEventListener("time", onTime as EventListener);
    }
  }, [])

  useEffect(() => {
    console.log("selectedWords", selectedWords)
    const min = selectedWords.reduce((min: number, p:Word) => p.start < min ? p.start : min, 9999);
    const max = selectedWords.reduce((max: number, p:Word) => p.end > max ? p.end : max, 0);
    console.log("[min, max]", min, max)
    // SET Player mask
  }, [selectedWords])

  const onPlay = (e: any) =>{    
    const playingEvt = new CustomEvent("playing", { detail: { time: e.target?.currentTime }});
    document.dispatchEvent(playingEvt);
  }
  const onPause = (e: any) =>{    
    const pauseEvt = new CustomEvent("pause", { detail: { time: e.target?.currentTime }});
    document.dispatchEvent(pauseEvt);
  }  
  const onSeeked = (e: any) =>{    
    const seekedEvt = new CustomEvent("seeked", { detail: { time: e.target?.currentTime }});
    document.dispatchEvent(seekedEvt);
  }

  const onTime = (e: any) =>{    
    const time = e.detail.time;
    console.log("onTime: ", time, msToSec(time))
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
        customControlsSection={
          [              
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
            <div className="flex flex-growth"></div>,
          ]
        }
        />    
        {blob && (
          <div className='relative'>
            <div className='absolute h-[75px] w-full inset-0'>
              <div ref={wordRef} className='absolute h-[75px] w-[40px] inset-y-0 bg-cyan-600/50' />
            </div>
            <AudioVisualizer
              ref={visualizerRef}
              blob={blob}
              width={width}
              height={75}
              barWidth={1}
              gap={1}
              barColor={'#c3afaa'}
              barPlayedColor={'#444'}          
            />
          </div>
      )}
    </div>      
  )
}