import { OrderDetail } from '../../model/orderDetail';
import { Product } from '../../model/product';
import { Order } from '../../model/order';
import { User } from '../../model/user';
import { Role, Status } from '../../types'; 

test('given: valid order detail values, when: order detail is created, then: it is initialized correctly', () => {
    // given
    const productData = {
        id: 1,
        name: 'Test Product',
        description: 'A product for testing',
        location: 'Warehouse A',
    };
    const product = new Product(productData);

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
    const order = new Order(orderData);

    const orderDetailData = {
        id: 1,
        quantity: 5,
        product: product,
        order: order,
        orderId: orderData.id,
        productId: productData.id,
    };

    // when
    const orderDetail = new OrderDetail(orderDetailData);

    // then
    expect(orderDetail.getId()).toEqual(orderDetailData.id);
    expect(orderDetail.getQuantity()).toEqual(orderDetailData.quantity);
    expect(orderDetail.getProductId()).toEqual(productData.id);
    expect(orderDetail.getOrderId()).toEqual(orderData.id);
});

test('given: invalid quantity, when: order detail is created, then: an error is thrown', () => {
    // given
    const productData = {
        id: 1,
        name: 'Test Product',
        description: 'A product for testing',
        location: 'Warehouse A',
    };
    const product = new Product(productData);

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
    const order = new Order(orderData);

    const orderDetailData = {
        id: 1,
        quantity: 0,
        product: product,
        order: order,
        orderId: orderData.id,
        productId: productData.id,
    };

    // when
    const createOrderDetail = () => new OrderDetail(orderDetailData);

    // then
    expect(createOrderDetail).toThrow('Quantity must be greater than 0');
});
