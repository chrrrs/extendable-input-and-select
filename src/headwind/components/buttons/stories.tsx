import { action } from '@storybook/addon-actions';
import ArrowDefault from '@tv2/ui-icons/components/primary/ArrowDefault';
import ArrowFilled from '@tv2/ui-icons/components/primary/ArrowFilled';
import Button from './button';

export const Design = () => {
  const knobs = {
    url: 'http://play.tv2.dk',
    type: 'primary' as const,
    color: 'play-blue' as const,
    disabled: false,
    size: 'large' as const,
    iconType: 'none',
    iconPosition: 'right' as const,
  };

  return (
    <div
      style={{
        backgroundColor: undefined,
      }}
    >
      <Button
        {...knobs}
        icon={knobs.iconType !== 'arrow_filled' ? ArrowDefault : ArrowFilled}
        onClick={action('onClick')}
      >
        TV 2 PLAY
      </Button>
    </div>
  );
};

Design.story = {
  name: 'button',
};
