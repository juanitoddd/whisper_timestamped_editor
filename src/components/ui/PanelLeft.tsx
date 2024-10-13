import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { SpinnerCircularSplit, SpinnerInfinity } from 'spinners-react';
import { addNode } from '../../features/flow/flowSlice';
import { MdDashboardCustomize } from "react-icons/md"
import { PiCodeBlockLight, PiWaveTriangleDuotone } from "react-icons/pi"
import { nanoid } from 'nanoid'
import { Timestamps } from '../blocks/Timestamps';

export function PanelLeft() {  
  const dispatch = useDispatch<AppDispatch>();   
  return (
    <aside
        className="bg-white border-r border-gray-200"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-1 px-3 h-full bg-white dark:bg-gray-800">
          <Timestamps />          
        </div>
      </aside>
  )
}