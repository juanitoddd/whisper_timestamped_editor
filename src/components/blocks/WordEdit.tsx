import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Button, Input, InputNumber, InputNumberProps, Select } from "antd";
import { CompressOutlined, ScanOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { Word, editWord } from '../../features/words/wordsSlice';
import { setCurrentTime } from '../../features/audio/audioSlice';
import { useState } from 'react';

export function WordEditor({word, color}: {word: Word, color: any}) {    
  const dispatch = useDispatch<AppDispatch>();

  const [eWord, setWord] = useState<Word>(word)  

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };

  const options: SelectProps['options'] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
    const _word = {...eWord, text: e.target.value}
    setWord(_word)
    dispatch(editWord(_word))
  };

  const startChange = (e: number | null) => {        
    const _word = {...eWord, start: e ?? word.start}
    setWord(_word)
    dispatch(editWord(_word))
  };

  const endChange = (e: number | null) => {    
    const _word = {...eWord, end: e ?? word.end}
    setWord(_word)
    dispatch(editWord(_word))
  };

  const placeCursor = () => {
    const middle = (word.end + word.start)/2
    // console.log(`placeCursor`, middle);
    dispatch(setCurrentTime(middle))
  }

  return (
    <div className='p-2 border rounded' style={{background: color.background, border:`1px solid ${color.border}`}}>
      <div className="flex justify-between items-center mb-2">      
        <div><Input type='' value={word.text} onChange={handleTextChange} /></div>
        <div className="flex">
          <div><InputNumber step={0.01} defaultValue={word.start} onChange={startChange} /></div>
          <div><Button onClick={placeCursor} className="border-0" icon={<ScanOutlined rotate={90} /> }></Button></div>
          <div><InputNumber step={0.01} defaultValue={word.end} onChange={endChange} /></div>
        </div>
      </div>
      <div>
      <Select
        mode="tags"
        style={{ width: '100%' }}        
        onChange={handleChange}
        options={options}
      />
      </div>
    </div>
  )
}