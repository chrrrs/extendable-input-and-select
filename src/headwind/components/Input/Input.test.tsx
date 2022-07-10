import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from './Input';

jest.unmock('react-dom');

describe('Input', () => {
  it('should format the hint message', () => {
    render(<Input label="test" onChange={jest.fn()} value="" hint="test" />);

    const label = screen.getByText('test');
    expect(label).toHaveAttribute('data-label-hint', ' - test');
  });

  it('should show the error text on blur', async () => {
    render(<Input label="test" onChange={jest.fn()} value="" isInvalid errorText="error" />);

    const input = screen.getByLabelText('test');
    userEvent.click(input);
    userEvent.click(document.body);

    expect(await screen.findByText('error')).toBeVisible();
  });

  it('should show the info text', async () => {
    render(<Input label="test" onChange={jest.fn()} value="" infoText="info text" />);

    const infoButton = screen.getByLabelText('info');
    userEvent.click(infoButton);

    expect(await screen.findByText('info text')).toBeInTheDocument();

    // should be able to close the info container on click away
    userEvent.click(document.body);
    await waitFor(() => expect(screen.queryByText('info text')).not.toBeInTheDocument());
  });
});
