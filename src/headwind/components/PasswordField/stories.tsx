import { useState } from 'react';
import PasswordField, { PasswordFieldProps } from './PasswordField';

export const Design = () => {
  const [value, setValue] = useState('');
  const knobs: Omit<PasswordFieldProps, 'value'> = {
    isInvalid: false,
    hint: '',
    label: 'Story',
    infoText: '',
    errorText: 'Error text',
  };

  return (
    <div className="px-4">
      <PasswordField value={value} onChange={event => setValue(event.target.value)} {...knobs} />
    </div>
  );
};

Design.story = {
  name: 'Input',
};
