import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderView from '../pages/OrderView';

describe('OrderView component', () => {
  test('renders without crashing', () => {
    render(<OrderView />);
    expect(screen.getByText('Received Orders')).toBeInTheDocument();
  });
});