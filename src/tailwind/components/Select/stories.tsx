import { useState } from 'react';
import Select, { SelectProps } from './Select';

export const Design = () => {
  const [value, setValue] = useState('');
  const knobs: Omit<SelectProps, 'value'> = {
    isInvalid: false,
    hint: '',
    label: 'Story',
    infoText: '',
    options: ['0', '1', '2'],
    errorText: 'Error text',
  };

  return (
    <div className="px-4">
      <Select value={value} onChange={event => setValue(event.target.value)} {...knobs} />
    </div>
  );
};

Design.story = {
  name: 'Select',
};
