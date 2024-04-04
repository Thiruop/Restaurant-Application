import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../pages/Login'; 

jest.mock('axios'); 

describe('Login component', () => {
  it('redirects to /home after successful login', async () => {

    axios.post.mockResolvedValueOnce({ data: { token: 'mockToken' } });

    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByPlaceholderText('Role'), { target: { value: 'user' } });

    fireEvent.submit(getByText('Login'));

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/home');
    });
  });
});
