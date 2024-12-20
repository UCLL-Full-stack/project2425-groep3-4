import { Order } from '../../model/order';
import { OrderDetail } from '../../model/orderDetail';
import { User } from '../../model/user';
import orderService from '../../service/order.service';
import orderDb from '../../repository/order.db';
import userDb from '../../repository/user.db';
import { OrderInput } from '../../types';

jest.mock('../../repository/order.db');
jest.mock('../../repository/user.db');

const mockOrderDb = jest.mocked(orderDb);
const mockUserDb = jest.mocked(userDb);

describe('Order Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('given valid input, when getAllOrders is called, then it returns all orders', async () => {
        // given
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
            }),
        ];

        mockOrderDb.getAllOrders.mockResolvedValue(orders);

        // when
        const result = await orderService.getAllOrders();

        // then
        expect(result).toEqual(orders);
        expect(mockOrderDb.getAllOrders).toHaveBeenCalledTimes(1);
    });

    test('given valid order ID, when getOrderById is called, then it returns the order', async () => {
        // given
        const orderId = 1;
        const order = new Order({
            id: orderId,
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
        });

        mockOrderDb.getOrderById.mockResolvedValue(order);

        // when
        const result = await orderService.getOrderById({ id: orderId });

        // then
        expect(result).toEqual(order);
        expect(mockOrderDb.getOrderById).toHaveBeenCalledWith({ id: orderId });
    });

    test('given invalid order ID, when getOrderById is called, then it throws an error', async () => {
        // given
        const orderId = 1;
        mockOrderDb.getOrderById.mockResolvedValue(null);

        // when
        const getOrder = orderService.getOrderById({ id: orderId });

        // then
        await expect(getOrder).rejects.toThrow(`Order with ${orderId} does not exist`);
    });

    test('given valid input, when createOrder is called, then it creates and returns the order', async () => {
        // given
        const user = new User({
            id: 1,
            username: 'johndoe',
            password: 'password123',
            email: 'johndoe@example.com',
            role: 'user',
        });

        const orderInput: OrderInput = {
            user: { 
                id: 1, 
                username: 'johndoe', 
                password: 'password123', 
                email: 'johndoe@example.com', 
                role: 'user' 
            },
            status: 'processing',
            creationDate: new Date(),
            orderDetail: [
                { id: 1, orderId: 1, productId: 1, quantity: 10 },
            ],
        };

        const order = new Order({
            id: undefined,
            user,
            status: orderInput.status,
            creationDate: orderInput.creationDate,
            orderDetails: orderInput.orderDetail.map((detail) => new OrderDetail(detail)),
        });

        const createdOrder = new Order({
            id: 1,
            user: order.getUser(),
            status: order.getStatus(),
            creationDate: order.getCreationDate(),
            orderDetails: order.getOrderDetails(),
        });

        mockUserDb.getUserById.mockResolvedValue(user);
        mockOrderDb.createOrder.mockResolvedValue(createdOrder);

        // when
        const result = await orderService.createOrder(orderInput);

        // then
        expect(result).toEqual(createdOrder);
        expect(mockUserDb.getUserById).toHaveBeenCalledWith({ id: orderInput.user.id });
        expect(mockOrderDb.createOrder).toHaveBeenCalledWith(order);
    });

    test('given invalid user ID, when createOrder is called, then it throws an error', async () => {
        // given
        const orderInput: OrderInput = {
            user: { 
                id: 1, 
                username: 'johndoe', 
                password: 'password123', 
                email: 'johndoe@example.com', 
                role: 'user' 
            },
            status: 'processing',
            creationDate: new Date(),
            orderDetail: [],
        };

        mockUserDb.getUserById.mockResolvedValue(null);

        // when
        const createOrder = orderService.createOrder(orderInput);

        // then
        await expect(createOrder).rejects.toThrow('User does not exist');
    });

    test('given valid order ID, when deleteOrder is called, then it deletes and returns the order', async () => {
        // given
        const orderId = 1;
        const order = new Order({
            id: orderId,
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
        });

        mockOrderDb.deleteOrder.mockResolvedValue(order);

        // when
        const result = await orderService.deleteOrder(orderId);

        // then
        expect(result).toEqual(order);
        expect(mockOrderDb.deleteOrder).toHaveBeenCalledWith(orderId);
    });
});
