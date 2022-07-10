import { useState, VFC } from 'react';
import { Input, InputProps } from '../Input';

export interface PasswordFieldProps extends InputProps {}

const PasswordField: VFC<PasswordFieldProps> = props => {
  const [mask, setMask] = useState(true);
  const toggleButton = (
    <button
      className="typo-body-2xs text-link-blue border-none"
      type="button"
      onClick={() => {
        setMask(value => !value);
      }}
      aria-label={
        mask ? 'Vis adgangskode - bemærk, dette synliggøre din adgangskode' : 'Skjul adgangskode'
      }
    >
      {mask ? 'Vis' : 'Skjul'}
    </button>
  );
  return <Input {...props} type={mask ? 'password' : 'text'} rightElement={toggleButton} />;
};

export default PasswordField;
