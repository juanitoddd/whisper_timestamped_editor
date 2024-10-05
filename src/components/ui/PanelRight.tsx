import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import timestamps from '../../../public/timestamps_es.json';
import { Timestamps } from '../blocks/Timestamps';

export function PanelRight() {

  const selected = useSelector((state: RootState) => state.ui.rightPanel);
  const panels = [
    { id: 'timestamps', component: <Timestamps key={1}/> },
    { id: 'editor', component: <div key={2}>Panel2</div>}
  ]
  return (
    <aside
      className="pt-1 transition-transform -translate-x-full bg-white border-l border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"      
      aria-label="Sidenav"
      id="output"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        {panels.map((panel) => panel.id === selected ? panel.component : null)}
      </div>     
    </aside>
  )
}