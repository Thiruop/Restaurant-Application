import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '../pages/Register';

describe('Register component', () => {
  it('should display error if password and confirm password do not match', () => {
    const { getByText, getByLabelText } = render(<Register />);

    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'differentpassword' } });
    fireEvent.change(getByLabelText('location'), { target: { value: 'testlocation' } });

    fireEvent.submit(getByText('Register'));

    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('should not display error if password and confirm password match', () => {
    const { getByText, getByLabelText, queryByText } = render(<Register />);

    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('location'), { target: { value: 'testlocation' } });

    fireEvent.submit(getByText('Register'));
    expect(queryByText('Passwords do not match')).toBeNull();
  });
});
