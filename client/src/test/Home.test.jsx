import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home component', () => {
  it('should navigate to /open when clicking on an open restaurant', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Open Restaurant'));
    expect(window.location.pathname).toEqual('/open');
  });

  it('should navigate to /close when clicking on a closed restaurant', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Closed Restaurant'));
    expect(window.location.pathname).toEqual('/close');
  });
});
