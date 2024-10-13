import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import timestamps from '../../../public/timestamps_es.json';
import { Timestamps } from '../blocks/Timestamps';
import { Editor } from '../blocks/Editor';
import { Output } from '../blocks/Output';

export function PanelRight() {

  const selected = useSelector((state: RootState) => state.ui.rightPanel);
  const panels = [
    { id: 'editor', component: <Editor key="editor"/> },
    { id: 'output', component: <Output key="output"/>}
  ]
  return (
    <aside
      className="bg-white border-l border-gray-200"      
      aria-label="Sidenav"
      id="output"
    >
      <div className="overflow-y-auto py-1 px-3 h-full bg-white dark:bg-gray-800">
        {panels.map((panel) => panel.id === selected ? panel.component : null)}
      </div>     
    </aside>
  )
}