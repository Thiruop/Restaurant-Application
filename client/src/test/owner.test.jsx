import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Owner } from '../pages'; 
describe('Owner', () => {
  it('of the field is empty', () => {
    const { getByTestId, getByText } = render(<Owner />);
 
    const submitButton = getByTestId('submit-button');
 
    fireEvent.click(submitButton);
 
    expect(getByText('All fields are required')).toBeInTheDocument();
  });
});
