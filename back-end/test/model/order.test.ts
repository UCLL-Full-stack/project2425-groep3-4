import { Order } from '../../model/order';
import { User } from '../../model/user';
import { Role, Status } from '../../types'; 


test('given: valid order values, when: order is created, then: order is initialized correctly', () => {
    // given
    const userData = {
        id: 1,
        username: 'john',
        password: 'password123',
        email: 'john@example.com',
        role: 'admin' as Role,
    };
    const user = new User(userData);

    const orderData = {
        id: 1,
        status: 'Pending' as Status,
        creationDate: new Date(),
        user: user,
        orderDetails: [],
        products: [],
    };

    // when
    const order = new Order(orderData);

    // then
    expect(order.getId()).toEqual(orderData.id);
    expect(order.getStatus()).toEqual(orderData.status);
    expect(order.getCreationDate()).toEqual(orderData.creationDate);
    expect(order.getUser()).toEqual(user);
});

test('given: invalid status, when: order is created, then: an error is thrown', () => {
    // given
    const userData = {
        id: 1,
        username: 'rijensh',
        password: 'password123',
        email: 'rijensh@example.com',
        role: 'manager' as Role,
    };
    const user = new User(userData);

    const orderData = {
        id: 1,
        status:  '' as unknown as Status,
        creationDate: new Date(),
        user: user,
        orderDetails: [],
        products: [],
    };

    // when
    const createOrder = () => new Order(orderData);

    // then
    expect(createOrder).toThrow('Status is required');
});
