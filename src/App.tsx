import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
// Hooks
import { useEffect } from 'react';
import { useGetNodesQuery } from './services/nodes';
// UI
import { Nav } from './components/ui/Nav';
import { Player } from './components/blocks/Player';
import { PanelRight } from './components/ui/PanelRight';
import { PanelLeft } from './components/ui/PanelLeft';

// css
import "./styles.css";
import { FileName } from './components/ui/FileName';
import { Display } from './components/blocks/Display';

// Data
import timestamps from '../public/timestamps_es.json';
import { setWords, Word, WordGroup } from './features/words/wordsSlice';
import { v4 as uuidv4 } from 'uuid';

export default function App() {  

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    let words: Word[] = [];
    const segs = timestamps.segments
    for(const seg of segs) { 
      const _words: Word[] = seg.words.map((word: any) => ({...word, id: uuidv4()}))
      words = words.concat(_words)
    }         
    dispatch(setWords(words))
  }, []);

  return (
    <div className="antialiased bg-gray-50">
      <div className="grid grid-rows-site h-screen">
        <Nav />
        <div className="grid grid-cols-panels border-b">
          <PanelLeft />
          <div className="grid grid-rows-flow">
            <Display/>
            {/* <Flow /> */}
            {/* <div className="h-screen w-screen"></div> */}
          </div>
          <PanelRight />
        </div>
        <Player/>  
      </div>
    </div>
  );
}
