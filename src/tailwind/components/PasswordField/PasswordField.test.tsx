import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import PasswordField from './PasswordField';

jest.unmock('react-dom');

describe('PasswordField', () => {
  it('should toggle between hidden and unhidden state', async () => {
    const password = 'secret';
    render(<PasswordField value={password} label="password" onChange={() => {}} />);

    const input = screen.getByLabelText('password');

    // password should be hidden by default
    expect(input).toHaveAttribute('type', 'password');

    // click on the button to show the password
    userEvent.click(screen.getByRole('button'));

    // password should be visible
    await waitFor(() => expect(input).toHaveAttribute('type', 'text'));
  });
});
