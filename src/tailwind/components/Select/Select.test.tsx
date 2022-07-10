import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Select from './Select';

jest.unmock('react-dom');

describe('Select', () => {
  it('should show the error text on blur', async () => {
    render(
      <Select
        label="test"
        onChange={jest.fn()}
        value="1"
        options={['1', '2', '3']}
        isInvalid
        errorText="error"
      />
    );

    const input = screen.getByLabelText('test');
    userEvent.click(input);
    userEvent.click(document.body);

    expect(await screen.findByText('error')).toBeVisible();
  });

  it('should show the info text', async () => {
    render(
      <Select
        label="test"
        onChange={jest.fn()}
        value="1"
        options={['1', '2', '3']}
        infoText="info text"
      />
    );

    const infoButton = screen.getByLabelText('info');
    userEvent.click(infoButton);

    expect(await screen.findByText('info text')).toBeInTheDocument();

    // should be able to close the info container on click away
    userEvent.click(document.body);
    await waitFor(() => expect(screen.queryByText('info text')).not.toBeInTheDocument());
  });
});
