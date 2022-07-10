import { useState } from 'react';
import Input, { InputProps } from './Input';

export const Design = () => {
  const [value, setValue] = useState('');
  const knobs: Omit<InputProps, 'value'> = {
    isInvalid: false,
    hint: '',
    label: 'Story',
    infoText: '',
    errorText: 'Error text',
  };

  return (
    <div className="px-4">
      <Input value={value} onChange={event => setValue(event.target.value)} {...knobs} />
    </div>
  );
};

Design.story = {
  name: 'Input',
};
