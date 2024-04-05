import React from 'react';
import { render, screen } from '@testing-library/react';
import Dish from '../pages/Dish';

describe('Dish Component', () => {
  test('renders loading state initially', () => {
    render(<Dish />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});