import { Order } from '../../model/order'; 
import { User } from '../../model/user'; 
import orderService from '../../service/order.service'; 
import orderDb from '../../repository/order.db'; 
import { OrderInput } from '../../types'; 

jest.mock('../../repository/order.db');
jest.mock('../../repository/user.db');

const mockOrderDb = jest.mocked(orderDb);

describe('Order Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('dummy test', () => {
    expect(true).toBe(true);
  });

  test('given valid input, when getAllOrders is called, then it returns all orders', async () => {
    // Your actual test logic goes here
    const orders = [
      new Order({
        id: 1,
        status: 'processing',
        creationDate: new Date(),
        user: new User({
          id: 1,
          username: 'johndoe',
          password: 'password123',
          email: 'johndoe@example.com',
          role: 'user',
        }),
        orderDetails: [],
        products: [],
      }),
    ];

    mockOrderDb.getAllOrders.mockResolvedValue(orders);

    const result = await orderService.getAllOrders();

    expect(result).toEqual(orders);
    expect(mockOrderDb.getAllOrders).toHaveBeenCalledTimes(1);
  });
});
