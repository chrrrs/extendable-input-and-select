import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { InputInfo } from './InputInfo';

jest.unmock('react-dom');

describe('InputInfo', () => {
  it('should show the input info', async () => {
    render(<InputInfo text="test" />);

    const infoButton = screen.getByLabelText('info');
    userEvent.click(infoButton);

    await waitFor(() => {
      expect(screen.getByText(text => text.startsWith('Hvorfor?'))).toBeInTheDocument();
      expect(screen.getByText(text => text.endsWith('test'))).toBeInTheDocument();
    });
  });
});
