import { useState } from 'react';
import { Input } from './Input';

export const Design = () => {
  const [value, setValue] = useState('');

  const knobs = {
    isInvalid: false,
    hint: '',
    label: 'Story',
    infoText: '',
    errorText: 'Error text',
  };

  return (
    <div className="px-10">
      <Input value={value} onChange={event => setValue(event.target.value)} {...knobs} />
    </div>
  );
};

Design.story = {
  name: 'input',
};
