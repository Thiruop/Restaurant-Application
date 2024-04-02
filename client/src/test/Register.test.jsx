import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import Register from '../pages';

jest.mock('axios');

describe('Register component', () => {
  it('displays error message for empty form submission', async () => {
    const { getByText, getByRole } = render(<Register />);
    const registerButton = getByRole('button', { name: /register/i });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(getByText(/all fields are required/i)).toBeInTheDocument();
    });
  });

  it('displays error message for mismatched passwords', async () => {
    const { getByText, getByLabelText, getByRole } = render(<Register />);
    const passwordInput = getByLabelText(/password/i);
    const confirmPasswordInput = getByLabelText(/confirm password/i);
    const registerButton = getByRole('button', { name: /register/i });

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    axios.post.mockResolvedValueOnce({ data: 'Registration successful' });

    const { getByLabelText, getByRole } = render(<Register />);
    const nameInput = getByLabelText(/username/i);
    const emailInput = getByLabelText(/email address/i);
    const passwordInput = getByLabelText(/password/i);
    const confirmPasswordInput = getByLabelText(/confirm password/i);
    const locationInput = getByLabelText(/location/i);
    const registerButton = getByRole('button', { name: /register/i });

    fireEvent.change(nameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    fireEvent.change(locationInput, { target: { value: 'New York' } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('handles network error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    const { getByRole, getByText } = render(<Register />);
    const registerButton = getByRole('button', { name: /register/i });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });
});
