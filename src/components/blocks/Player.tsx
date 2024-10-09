import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

// Audio Player
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export function Player() {  

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

  return (        
    <AudioPlayer
      src="/basic_es.wav"
      volume={0.5}
      showJumpControls={false}      
      listenInterval= {5}
      progressUpdateInterval={10}      
      onPause={onPause}
      onPlay={onPlay}      
      onSeeked={onSeeked}
      customControlsSection={
        [              
          <div className="flex flex-growth"></div>,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
        ]
      }
      // Try other props!
    />    
  )
}