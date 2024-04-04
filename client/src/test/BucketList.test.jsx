import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import BucketList from '../pages/BucketList';

jest.mock('axios');

describe('BucketList component', () => {
  it('should remove item from the bucket list when cancel button is clicked', async () => {
    const bucketListData = [
      {
        _id: '1',
        restaurant_name: 'Restaurant 1',
        dishes: [
          { _id: '1', dish_name: 'Dish 1', dish_price: 10, dish_image: 'dish1.jpg' },
          { _id: '2', dish_name: 'Dish 2', dish_price: 20, dish_image: 'dish2.jpg' },
        ],
      },
    ];

    axios.delete.mockResolvedValueOnce();

    const { getByText, queryByText } = render(<BucketList />);
    await waitFor(() => {
      expect(queryByText('Loading...')).toBeNull();
    });
    fireEvent.click(getByText('Cancel'));
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:3000/api/bucketlist/Dish 1`
      );
    });
    expect(queryByText('Dish 1')).toBeNull();
  });
});
