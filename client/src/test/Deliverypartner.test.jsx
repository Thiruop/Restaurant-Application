import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import DeliveryPartner from '../pages/Deliverypartner';

jest.mock('axios');

describe('DeliveryPartner component', () => {
  it('should update order status when checkbox is clicked', async () => {
    const viewOrdersData = [
      {
        _id: '1',
        username: 'User 1',
        dish_name: 'Dish 1',
        restaurant_name: 'Restaurant 1',
        price: 20,
        location: 'Location 1',
        order_status: 'pending',
        track_down: 'Track down info 1',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: { view_orders: viewOrdersData } });
    axios.put.mockResolvedValueOnce();

    const { getByText, getByDisplayValue } = render(<DeliveryPartner />);

   
    await waitFor(() => {
      expect(getByText('User 1')).toBeInTheDocument();
    });
    fireEvent.click(getByDisplayValue('pending'));
    await waitFor(() => {
      expect(getByDisplayValue('delivered')).toBeInTheDocument();
    });
    fireEvent.click(getByDisplayValue('delivered'));
    await waitFor(() => {
      expect(getByDisplayValue('pending')).toBeInTheDocument();
    });
    fireEvent.click(getByText('Submit'));
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:3000/api/orders',
        expect.objectContaining({
          orders: [
            {
              ...viewOrdersData[0],
              order_status: 'delivered',
            },
          ],
        })
      );
    });
  });
});
