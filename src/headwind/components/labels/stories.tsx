import Label from './label';

export const Design = () => {
  const knobs = {
    text: 'Min label',
    color: 'play' as const,
    size: 'medium' as const,
    type: 'primary' as const,
  };

  return (
    <div className="px-5">
      <Label {...knobs}></Label>
    </div>
  );
};
