import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ClickAwayListener } from './ClickAwayListener';

jest.unmock('react-dom');

describe('ClickAwayListener', () => {
  it('should execute an action on click away', async () => {
    const onClickAway = jest.fn();
    render(
      <ClickAwayListener onClickAway={onClickAway}>
        <div aria-label="test" />
      </ClickAwayListener>
    );

    const element = screen.getByLabelText('test');

    userEvent.click(element);
    expect(onClickAway).not.toHaveBeenCalled();

    userEvent.click(document.body);
    await waitFor(() => expect(onClickAway).toHaveBeenCalled());
  });
});
