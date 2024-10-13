import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Input, InputNumber, InputNumberProps, Select } from "antd";
import type { SelectProps } from 'antd';
import { Word, editWord } from '../../features/words/wordsSlice';

export function WordEditor({word, color}: {word: Word, color: any}) {    
  const dispatch = useDispatch<AppDispatch>();

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
    const _word = {...word, text: e.target.value}
    dispatch(editWord(_word))
    // word.text = e.target.value
  };

  const startChange = (e: number | null) => {
    console.log(`w`, e);
  };

  const endChange = (e: number | null) => {
    console.log(`w`, e);
  };

  return (
    <div className='p-2 border rounded my-3' style={{background: color.background, border:`1px solid ${color.border}`}}>
      <div className="flex justify-between items-center mb-2">      
        <div><Input type='' value={word.text} onChange={handleTextChange} /></div>
        <div className="flex">
          <div><InputNumber step={0.01} defaultValue={word.start} onChange={startChange} /></div>
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